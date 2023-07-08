import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {grpcConfig} from "./grpc.config";
import {PrismaService} from "./prisma.service";
import {UserModule} from "./user/user.module";
import {RefreshTokenService} from './refresh-token/refresh-token.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import Joi from "joi";


@Module({
	imports: [GrpcReflectionModule.register(grpcConfig),
		JwtModule.register({
			secret: 'super-secret',
			signOptions: {expiresIn: '5m'},
		}),
		UserModule],
	controllers: [AppController],
	providers: [RefreshTokenService,  PrismaService],
})
export class AppModule {
}
