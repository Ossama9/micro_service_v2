import {ClientProviderOptions, GrpcOptions, Transport} from '@nestjs/microservices';
import {ANNOUNCE_V1ALPHA_PACKAGE_NAME} from './stubs/announce/v1alpha/announce';
import {join} from 'path';
import {addReflectionToGrpcConfig} from 'nestjs-grpc-reflection';
import {HOTEL_SERVICE_NAME, HOTEL_V1ALPHA_PACKAGE_NAME} from "./stubs/hotel/v1alpha/hotel";
import {USER_V1ALPHA_PACKAGE_NAME} from "./stubs/user/v1alpha/user";
import {ChannelCredentials} from "@grpc/grpc-js";

export const grpcConfig = addReflectionToGrpcConfig({
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6002',
		package: ANNOUNCE_V1ALPHA_PACKAGE_NAME,
		protoPath: join(__dirname, 'proto/announce/v1alpha/announce.proto'),
	},
}) as GrpcOptions;

export const hotelGrpcOptions: ClientProviderOptions = {
	name: HOTEL_SERVICE_NAME,
	transport: Transport.GRPC,
	options: {
		url: '0.0.0.0:6001',
		package: HOTEL_V1ALPHA_PACKAGE_NAME,
		loader: {
			includeDirs: [join(__dirname, './proto')],
		},
		protoPath: [join(__dirname, './proto/hotel/v1alpha/hotel.proto')],
		credentials: ChannelCredentials.createInsecure(),
	},
};

