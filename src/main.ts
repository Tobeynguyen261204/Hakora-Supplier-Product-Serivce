import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
    // Create gRPC microservice
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'supplierproduct',
            protoPath: join(__dirname, 'presentation', 'proto', 'supplier-product.proto'),
            url: '0.0.0.0:50052', // gRPC port
        },
    });

    await app.listen();
    console.log('SupplierProductService gRPC is running on port 50052');
}
bootstrap();
