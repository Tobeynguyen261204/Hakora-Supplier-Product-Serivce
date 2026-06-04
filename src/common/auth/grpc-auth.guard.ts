import { 
    CanActivate, Injectable, ExecutionContext 
} from "@nestjs/common";
import { Metadata } from '@grpc/grpc-js';
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const rpc = context.switchToRpc();
    const metadata = rpc.getContext<Metadata>();

    if (!metadata) {
      throw new RpcException('Missing metadata');
    }

    const userId = metadata.get('userid')?.[0]?.toString();
    const role = metadata.get('userrole')?.[0]?.toString();

    if (!userId || !role) {
      throw new RpcException('Unauthorized');
    }

    // Attach to context safely
    rpc.getContext()['auth'] = { userId, role };

    return true;
  }
}

