import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {
    AddRequest, AddResponse,
    Announce,
    AnnounceCRUDServiceController,
    AnnounceCRUDServiceControllerMethods, DeleteRequest, DeleteResponse,
    GetRequest, GetResponse, UpdateRequest, UpdateResponse
} from "./stubs/announce/v1alpha/announce";
import {AnnounceService} from "./announce/announce.service";
import {Metadata} from "@grpc/grpc-js";
import {HotelService} from "./hotel/hotel.service";
import {RpcException} from "@nestjs/microservices";

@Controller()
@AnnounceCRUDServiceControllerMethods()
export class AppController implements AnnounceCRUDServiceController {
    constructor(private readonly announceService: AnnounceService, private readonly hotelService: HotelService) {
    }

    async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
        let announces: Announce[] = [];
        if (request.id) {
            const announce = await this.announceService.findById(request.id)
            if (!announce)
                throw new RpcException("announce not found")
            return {announces: [announce]}
        } else {
            announces = await this.announceService.findAll()
            return {announces: announces}
        }
    }

    async add(request: AddRequest, metadata?: Metadata,): Promise<AddResponse> {
        const id = +request.hotelId
        await this.hotelService.findHotel({id}, {metadata})
        const announce = await this.announceService.create({
            hotelId: request.hotelId,
            name: request.name,
            price: request.price
        })
        return {announce}
    }

    async update(request: UpdateRequest, metadata?: Metadata,): Promise<UpdateResponse> {
        const checkAnnounce = await this.announceService.findById(request.id)
        if (!checkAnnounce)
            throw new RpcException("announce not found")
        const id = +request.hotelId
        await this.hotelService.findHotel({id}, {metadata})
        const announce = await this.announceService.update(request.id, {
            hotelId: request.hotelId,
            name: request.name,
            price: request.price
        })
        return {announce}
    }

    async delete(request: DeleteRequest, metadata?: Metadata,): Promise<DeleteResponse> {
        const announce = await this.announceService.delete(request.id)
        return {announce}
    }


}
