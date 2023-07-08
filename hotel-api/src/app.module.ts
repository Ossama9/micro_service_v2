import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './hotel/hotel.service';
import {PrismaService} from "./prisma.service";
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {grpcConfig} from "./grpc.config";
import { UserModule } from './user/user.module';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
