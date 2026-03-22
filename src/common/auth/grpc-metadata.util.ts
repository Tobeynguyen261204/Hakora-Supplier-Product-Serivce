import { Metadata } from "@grpc/grpc-js";

export function extractAuth(metadata: Metadata): { userId: string; role: string } {
    const userId = metadata.get('userid')?.[0]?.toString() || '';
    const role = metadata.get('userrole')?.[0]?.toString() || '';
    return { userId, role };
}