import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {HotelService} from './hotel/hotel.service';
import {PrismaService} from "./prisma.service";
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {grpcConfig} from "./grpc.config";
import {UserModule} from './user/user.module';
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "./auth/auth.module";

@Module({
	imports: [
		GrpcReflectionModule.register(grpcConfig),
		JwtModule.register({
			secret: 'super-secret',
			signOptions: {expiresIn: '2h'},
		}),
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [HotelService, PrismaService],
})
export class AppModule {
}
