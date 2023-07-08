import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ClientsModule} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {AUTH_V1ALPHA_PACKAGE_NAME} from "../stubs/auth/v1alpha/auth";
import {authGrpcOptions} from "../grpc.config";

@Module({
  imports: [ClientsModule.register([authGrpcOptions])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
