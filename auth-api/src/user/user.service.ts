import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {
	CheckPasswordResponse,
	FindRequest,
	FindResponse,
	User,
	USER_SERVICE_NAME,
	UserServiceClient
} from "../stubs/user/v1alpha/user";
import {Metadata} from "@grpc/grpc-js";
import {firstValueFrom} from "rxjs";
import {ClientGrpc} from "@nestjs/microservices";

@Injectable()
export class UserService implements OnModuleInit {
	private userService: UserServiceClient;
	constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}
	onModuleInit() {
		this.userService =
			this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
	}
	async checkPassword(
		email: string,
		password: string,
	): Promise<CheckPasswordResponse> {
		const res: CheckPasswordResponse = await firstValueFrom(
			this.userService.checkPassword({email, password}) as any,
		);
		return res;
	}
	async findUser(req: FindRequest, md: Record<string, any>): Promise<User> {
		const meta = new Metadata();
		Object.entries(md).map(([k, v]) => meta.add(k, v));
		const res: FindResponse = await firstValueFrom(
			this.userService.find(req, meta) as any,
		);
		return res.user?.[0];
	}
}