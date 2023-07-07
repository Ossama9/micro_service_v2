import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {GrpcMethod} from '@nestjs/microservices';
import {Metadata} from '@grpc/grpc-js';
import {
	DeleteRequest,
	DeleteResponse,
	FindRequest,
	FindResponse,
	GetRequest,
	GetResponse, MakeAdminRequest, MakeAdminResponse,
	MakeMerchantRequest,
	MakeMerchantResponse,
	RegisterRequest,
	RegisterResponse,
	UpdateRequest,
	UpdateResponse,
	User, UserServiceController,
	UserServiceControllerMethods
} from "./stubs/user/v1alpha/user";

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
	constructor(private readonly appService: AppService) {
	}

	async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
		let user: User;
		let users: User[] = [];
		if (request.id) {
			user = await this.appService.findById(request.id);
			return {users: [user]};
		} else if (request.email) {
			user = await this.appService.findByEmail(request.email);
			return {users: [user]};
		} else {
			users = await this.appService.findAll();
			return {users};
		}
	}

	async registerUser(request: RegisterRequest): Promise<RegisterResponse> {
		const user = await this.appService.create({
			email: request?.email,
			firstName: request?.firstName,
			lastName: request?.lastName,
			password: request?.password,
		});
		return {user: user as any};
	}

	async updateUser(request: UpdateRequest): Promise<UpdateResponse> {
		console.log("request",request)
		const userId = +request?.id
		const user = await this.appService.update({
			where: {
				id: userId,
			},
			data: {
				email: request.email,
				firstName: request.firstName,
				lastName: request.lastName,
				password: request.password,
			}
		});
		return {user: user as any};
	}

	async deleteUser(request: DeleteRequest): Promise<DeleteResponse> {
		const user = await this.appService.delete(+request.id) as any;
		return {user: user as any};
	}

	async makeMerchant(request: MakeMerchantRequest): Promise<MakeMerchantResponse> {
		const id = +request.id
		const user = await this.appService.update({
			where: {id},
			data: {role: 'MERCHANT'}
		}) as any;
		return {user: user as any};
	}

	async makeAdmin(request: MakeAdminRequest): Promise<MakeAdminResponse> {
		const id = +request.id
		const user = await this.appService.update({
			where: {id},
			data: {role: 'ADMIN'}
		}) as any;
		return {user: user as any};
	}
}
