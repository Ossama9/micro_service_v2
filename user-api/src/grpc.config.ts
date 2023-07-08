import {ClientProviderOptions, GrpcOptions, Transport} from '@nestjs/microservices';
import {USER_SERVICE_NAME, USER_V1ALPHA_PACKAGE_NAME} from './stubs/user/v1alpha/user';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import {ChannelCredentials} from "@grpc/grpc-js";
export const grpcConfig = addReflectionToGrpcConfig({
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6000',
		package: USER_V1ALPHA_PACKAGE_NAME,
		protoPath: join(__dirname, 'proto/user/v1alpha/user.proto'),
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
		protoPath: [join(__dirname, './proto/user/v1alpha/service.proto')],
		credentials: ChannelCredentials.createInsecure(),
	},
};