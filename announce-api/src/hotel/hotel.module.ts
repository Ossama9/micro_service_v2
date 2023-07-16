import { Module } from '@nestjs/common';
import {HotelService} from "./hotel.service";
import {hotelGrpcOptions} from "../grpc.config";
import {ClientsModule} from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([hotelGrpcOptions])],
    providers: [HotelService],
    exports: [HotelService],
})
export class HotelModule {}
