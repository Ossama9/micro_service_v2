import {ClientProviderOptions, GrpcOptions, Transport} from '@nestjs/microservices';
import { HOTEL_V1ALPHA_PACKAGE_NAME } from './stubs/hotel/v1alpha/hotel';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import {USER_SERVICE_NAME, USER_V1ALPHA_PACKAGE_NAME} from "./stubs/user/v1alpha/user";
import {ChannelCredentials} from "@grpc/grpc-js";
export const grpcConfig = addReflectionToGrpcConfig({
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6001',
		package: HOTEL_V1ALPHA_PACKAGE_NAME,
		protoPath: join(__dirname, 'proto/hotel/v1alpha/hotel.proto'),
	},
}) as GrpcOptions;

export const userGrpcOptions: ClientProviderOptions = {
	name: USER_SERVICE_NAME,
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6000',
		package: USER_V1ALPHA_PACKAGE_NAME,
		loader: {
			includeDirs: [join(__dirname, './proto')],
		},
		protoPath: [join(__dirname, './proto/user/v1alpha/user.proto')],
		credentials: ChannelCredentials.createInsecure(),
	},
};