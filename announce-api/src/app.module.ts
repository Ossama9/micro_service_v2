import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AnnounceService} from './announce/announce.service';
import {grpcConfig} from "./grpc.config";
import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {PrismaService} from "./prisma.service";
import { HotelModule } from './hotel/hotel.module';

@Module({
	imports: [GrpcReflectionModule.register(grpcConfig), HotelModule],
	controllers: [AppController],
	providers: [AnnounceService, PrismaService],
})
export class AppModule {
}
