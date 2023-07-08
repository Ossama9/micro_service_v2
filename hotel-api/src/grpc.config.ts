import { GrpcOptions, Transport } from '@nestjs/microservices';
import { HOTEL_V1ALPHA_PACKAGE_NAME } from './stubs/hotel/v1alpha/hotel';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
export const grpcConfig = addReflectionToGrpcConfig({
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6001',
		package: HOTEL_V1ALPHA_PACKAGE_NAME,
		protoPath: join(__dirname, 'proto/hotel/v1alpha/hotel.proto'),
	},
}) as GrpcOptions;