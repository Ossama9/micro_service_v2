import {status} from '@grpc/grpc-js';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {RpcException} from '@nestjs/microservices';
import {ValidateResponse} from 'src/stubs/auth/v1alpha/auth';
import {UserRole} from 'src/stubs/user/v1alpha/user';
import {AuthService} from './auth.service';
import {HotelService} from "../hotel/hotel.service";

@Injectable()
export class GrpcAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private hotelService: HotelService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToRpc().getContext();
			const type = context.getType();
			const prefix = 'Bearer ';
			let header: any;
			if (type === 'rpc') {
				const metadata = context.getArgByIndex(1);
				if (!metadata) {
					throw new Error('no metadata provided');
				}
				header = metadata.get('Authorization')[0];
			}
			if (!header || !header.includes(prefix)) {
				throw new Error('header malformed');
			}
			const token = header.slice(header.indexOf(' ') + 1);
			const res: ValidateResponse = await this.authService.validate(token);
			const roleId = res.userRole
			if (res?.ok !== true) {
				throw new RpcException({});
			}
			if (res.internal) {
				return true;
			}
			if (roleId === UserRole.ADMIN) {
				return true
			}
			const hotelId = +context.getArgs()[0]?.id
			if (hotelId) {
				console.log("hotelID",hotelId)
				const hotel = await this.hotelService.findById(hotelId)
				if (!hotel){
					throw new Error('Error get Hotel from request');
				}
				const userId = hotel.userId
				if (userId !== res.userId){
					throw new Error('Error Request');
				}
				return true
			}

			return false;
		} catch (error) {
			console.log({error});
			if (error instanceof RpcException) throw error;
			throw new RpcException({
				code: status.PERMISSION_DENIED,
				message: error?.details || error.message,
			});
		}
	}
}
