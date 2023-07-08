/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1alpha";

export enum UserRole {
  BASIC = 0,
  MERCHANT = 1,
  ADMIN = 2,
  UNRECOGNIZED = -1,
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  refreshToken?: string;
  jwt?: string;
  status?: LoginResponse_STATUS;
}

export enum LoginResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface RefreshTokenRequest {
  refreshToken?: string;
}

export interface RefreshTokenResponse {
  refreshToken?: string;
  jwt?: string;
}

export interface ValidateRequest {
  /** Add role here */
  jwt?: string;
}

export interface ValidateResponse {
  ok?: boolean;
  userId?: string;
  userEmail?: string;
  userRole?: UserRole;
  internal?: boolean;
}

export const AUTH_V1ALPHA_PACKAGE_NAME = "auth.v1alpha";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  refreshToken(request: RefreshTokenRequest, metadata?: Metadata): Observable<RefreshTokenResponse>;

  validate(request: ValidateRequest, metadata?: Metadata): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  refreshToken(
    request: RefreshTokenRequest,
    metadata?: Metadata,
  ): Promise<RefreshTokenResponse> | Observable<RefreshTokenResponse> | RefreshTokenResponse;

  validate(
    request: ValidateRequest,
    metadata?: Metadata,
  ): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "refreshToken", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
