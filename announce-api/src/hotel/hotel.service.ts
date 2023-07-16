import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {GetRequest, GetResponse, Hotel, HOTEL_SERVICE_NAME, HotelServiceClient} from "../stubs/hotel/v1alpha/hotel";
import {ClientGrpc, RpcException} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {meta} from "@typescript-eslint/parser";
import {Metadata} from "@grpc/grpc-js";

@Injectable()
export class HotelService implements OnModuleInit {
    private hotelService: HotelServiceClient
    constructor(@Inject(HOTEL_SERVICE_NAME) private client:ClientGrpc) {}

    onModuleInit(){
        this.hotelService = this.client.getService<HotelServiceClient>(HOTEL_SERVICE_NAME)
    }

    async findHotel(request:GetRequest, md:Record<string, any>): Promise<Hotel>{
        const meta = new Metadata()
        const response: GetResponse = await firstValueFrom(
            this.hotelService.get(request,meta)
        )
        if (!response.hotels){
            throw new RpcException('Hotel not found');
        }
        return response.hotels?.[0]
    }

}
