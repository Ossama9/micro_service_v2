import {Inject, Injectable} from '@nestjs/common';
import {AUTH_SERVICE_NAME, AuthServiceClient, ValidateResponse} from "../stubs/auth/v1alpha/auth";
import {ClientGrpc} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AuthService {
	private authService: AuthServiceClient;

	constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {
	}

	onModuleInit() {
		this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
	}
	async validate(jwt: string): Promise<ValidateResponse> {
		return await firstValueFrom(
			this.authService.validate({
				jwt,
			}) as any,
		);
	}
}
