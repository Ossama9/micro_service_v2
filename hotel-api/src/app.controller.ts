import {Controller} from '@nestjs/common';
import {HotelService} from './hotel/hotel.service';
import {
	AddRequest,
	AddResponse,
	ApproveHotelRequest,
	ApproveHotelResponse,
	DeleteRequest,
	DeleteResponse,
	GetRequest,
	GetResponse,
	Hotel,
	HOTEL_CR_UD_SERVICE_NAME,
	HotelCRUDServiceController,
	HotelCRUDServiceControllerMethods,
	PendingHotelRequest,
	PendingHotelResponse,
	STATUS,
	UpdateRequest,
	UpdateResponse
} from './stubs/hotel/v1alpha/hotel';
import {GrpcMethod, RpcException} from '@nestjs/microservices';
import {Metadata, status as RpcStatus} from '@grpc/grpc-js';
import {CreateHotelDto} from "./dto/create-hotel";
import {validate, ValidatorOptions} from 'class-validator';
import {plainToInstance} from "class-transformer";
import {Prisma} from '@prisma/client';
import {UserService} from "./user/user.service";
import {User, UserRole} from "./stubs/user/v1alpha/user";
import {JwtService} from "@nestjs/jwt";
import { UseGuards } from '@nestjs/common';
import {GrpcAuthGuard} from "./auth/hotel.guard";

@Controller()
@HotelCRUDServiceControllerMethods()
export class AppController implements HotelCRUDServiceController {

	constructor(private readonly hotelService: HotelService,
				private readonly userService: UserService,
				private jwtService: JwtService
	) {
	}

	async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
		let hotel: Hotel;
		let hotels: Hotel[] = [];
		if (request.id) {
			const hotel = await this.hotelService.findById(request.id);
			return {hotels: [hotel] as any};
		} else {
			hotels = await this.hotelService.findAll();
			return {hotels: hotels as any};
		}
	}

	@UseGuards(GrpcAuthGuard)
	async pendingHotel(request: PendingHotelRequest, metadata?: Metadata): Promise<PendingHotelResponse> {
		let hotel: Hotel;
		let hotels: Hotel[] = [];
		if (request.id) {
			const hotel = await this.hotelService.findById(request.id);
			return {hotels: [hotel]};
		} else {
			hotels = await this.hotelService.pendingHotel();
			return {hotels: hotels};
		}
	}

	@UseGuards(GrpcAuthGuard)
	async update(
		request: UpdateRequest,
		metadata?: Metadata,
	): Promise<UpdateResponse> {
		const {id, status, ...rest} = request;
		const convertedStatus = STATUS[status] || STATUS.UNRECOGNIZED;

		const cleanedRequest = {
			...rest,
			...(convertedStatus && {status: convertedStatus}),
		};
		const hotel = await this.hotelService.update(id, cleanedRequest as Prisma.HotelUpdateInput);
		return {hotel};
	}

	@UseGuards(GrpcAuthGuard)
	async delete(
		request: DeleteRequest,
		metadata?: Metadata,
	): Promise<DeleteResponse> {
		const hotel = await this.hotelService.delete(request.id);
		return {hotel};
	}

	@UseGuards(GrpcAuthGuard)
	async approveHotel(
		request: ApproveHotelRequest,
		metadata?: Metadata,
	): Promise<ApproveHotelResponse> {
		const jwtToken = metadata.get('authorization').toString().split(' ')[1]
		const {user, internal}: { user: User; internal: boolean } = this.jwtService.verify(jwtToken);

		if (user.role !== UserRole.ADMIN)
			throw new RpcException('Forbidden');

		const status = STATUS[1]
		let hotel

		try {
			hotel = await this.hotelService.update(request.id, {status} as any);
		} catch (e) {
			throw new RpcException('Hotel does exist');
		}
		const userId = hotel.userId
		try {
			const user = await this.userService.makeMerchant({
				id: userId
			});
			if (!user) {
				throw new RpcException('Error User does exist');
			}
		} catch (e) {
			throw new RpcException('Hotel does exist');
		}
		return {hotel};
	}

	@GrpcMethod(HOTEL_CR_UD_SERVICE_NAME)
	async add(request: AddRequest, metadata?: Metadata,): Promise<AddResponse> {
		try {
			const jwtToken = metadata.get('authorization').toString().split(' ')[1]
			const dto: CreateHotelDto = await this.validateDto(request, CreateHotelDto);
			const {userId} = request
			const {user, internal}: { user: User; internal: boolean } = this.jwtService.verify(jwtToken);
			if (user.id != request.userId)
				throw new RpcException("Error User connecté");
			const data = {
				id: userId,
				firstName: undefined,
				lastName: undefined,
				email: undefined,
			}
			const result = await this.userService.findUser(data, {})
			if (!result) {
				throw new RpcException("User does not exist");
			}
			const hotel = await this.hotelService.create(request as any);
			return {hotel};
		} catch (e) {
			throw new RpcException(e);
		}

	}

	private async validateDto(
		data: any,
		Dto: any,
		validatorOptions?: ValidatorOptions,
	) {
		const dto = plainToInstance(Dto, data);
		const errors = await validate(dto, validatorOptions);

		if (errors.length > 0) {
			throw new RpcException({
				code: RpcStatus.INVALID_ARGUMENT,
				message: errors
					.map(
						({value, property, constraints}) =>
							`${value} is not a valid ${property} value (${Object.values(
								constraints,
							).join(', ')})`,
					)
					.join('\n'),
			});
		}
		return dto as typeof Dto;
	}
}