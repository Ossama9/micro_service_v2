import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {
	AuthServiceController,
	AuthServiceControllerMethods,
	LoginRequest,
	LoginResponse, LoginResponse_STATUS, RefreshTokenRequest, RefreshTokenResponse, ValidateRequest, ValidateResponse
} from "./stubs/auth/v1alpha/auth";
import {RefreshTokenService} from "./refresh-token/refresh-token.service";
import {UserService} from "./user/user.service";
import {createHash} from "crypto";
import {CheckPasswordResponse_STATUS, User} from "./stubs/user/v1alpha/user";
import {JwtService} from "@nestjs/jwt";
import {RpcException} from "@nestjs/microservices";
import {status as RpcStatus} from '@grpc/grpc-js';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController {
	constructor(private readonly refreshTokenService: RefreshTokenService, private readonly userService: UserService, private jwtService: JwtService,
	) {

	}

	async login(request: LoginRequest): Promise<LoginResponse> {
		const {user, status} = await this.userService.checkPassword(
			request.email,
			request.password,
		);
		switch (status) {
			case CheckPasswordResponse_STATUS.OK:
				const rt = await this.refreshTokenService.createRefreshToken({
					userId: user.id,
					refreshToken: createHash('md5')
						.update(`${user.id}-${new Date().toISOString()}`)
						.digest('hex'),
				});
				return {
					jwt: this.jwtService.sign({user}),
					refreshToken: rt.refreshToken,
					status: LoginResponse_STATUS.OK,
				};
			case CheckPasswordResponse_STATUS.WRONG_PASSWORD:
				throw new RpcException({
					code: RpcStatus.INVALID_ARGUMENT,
					message: 'wrong password',
				});
			case CheckPasswordResponse_STATUS.INTERNAL:
				throw new RpcException('Something went wrong');
			case CheckPasswordResponse_STATUS.NOT_FOUND:
				throw new RpcException({
					code: RpcStatus.NOT_FOUND,
					message: `user with email ${request.email} not found`,
				});
			default:
				break;
		}

		return "azer" as any
	}

	async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
		const rt = await this.refreshTokenService.refreshToken({
			refreshToken: request.refreshToken,
		});
		if (!rt)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'refresh token not found',
			});
		if (rt.revoked)
			throw new RpcException({
				code: RpcStatus.PERMISSION_DENIED,
				message: 'refresh token revoked',
			});
		const user = await this.userService.findUser(
			{
				id: rt.userId,
				firstName: undefined,
				lastName: undefined,
				email: undefined,
			},
			{Authorization: `Bearer ${this.jwtService.sign({internal: true})}`},
		);
		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'user not found',
			});

		return {
			refreshToken: undefined,
			jwt: this.jwtService.sign({user}),
		};
	}

	async validate(request: ValidateRequest): Promise<ValidateResponse> {
		const {user, internal}: { user: User; internal: boolean } = this.jwtService.verify(request.jwt);
		if (!internal && !user)
			throw new RpcException({
				code: RpcStatus.PERMISSION_DENIED,
				message: 'cannot verify jwt',
			});

		return {
			ok: true,
			userId: user?.id,
			userEmail: user?.email,
			userRole: user?.role,
			internal: internal,
		};
	}

}
