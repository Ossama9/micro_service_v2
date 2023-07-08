import {ClientProviderOptions, GrpcOptions, Transport} from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import {USER_SERVICE_NAME, USER_V1ALPHA_PACKAGE_NAME} from "./stubs/user/v1alpha/user";
import {ChannelCredentials} from "@grpc/grpc-js";
import {AUTH_V1ALPHA_PACKAGE_NAME} from "./stubs/auth/v1alpha/auth";
export const grpcConfig = addReflectionToGrpcConfig({
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:5999',
		package: AUTH_V1ALPHA_PACKAGE_NAME,
		protoPath: join(__dirname, 'proto/auth/v1alpha/auth.proto'),
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