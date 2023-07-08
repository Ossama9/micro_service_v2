/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "user.v1alpha";

export enum UserRole {
  BASIC = 0,
  MERCHANT = 1,
  ADMIN = 2,
  UNRECOGNIZED = -1,
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  role?: UserRole;
}

export interface RegisterRequest {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface RegisterResponse {
  user?: User;
}

export interface UpdateRequest {
  id?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UpdateResponse {
  user?: User;
}

export interface DeleteRequest {
  id?: string;
}

export interface DeleteResponse {
  user?: User;
}

export interface FindRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface FindResponse {
  user?: User[];
}

export interface MakeMerchantRequest {
  id?: string;
}

export interface MakeMerchantResponse {
  user?: User;
}

export interface MakeAdminRequest {
  id?: string;
  email?: string;
}

export interface MakeAdminResponse {
  user?: User;
}

export interface GetRequest {
  email?: string;
  id?: number;
}

export interface GetResponse {
  users?: User[];
}

export interface CheckPasswordRequest {
  email?: string;
  password?: string;
}

export interface CheckPasswordResponse {
  status?: CheckPasswordResponse_STATUS;
  user?: User;
}

export enum CheckPasswordResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export const USER_V1ALPHA_PACKAGE_NAME = "user.v1alpha";

export interface UserServiceClient {
  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  checkPassword(request: CheckPasswordRequest, metadata?: Metadata): Observable<CheckPasswordResponse>;

  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  registerUser(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  updateUser(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  deleteUser(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  makeMerchant(request: MakeMerchantRequest, metadata?: Metadata): Observable<MakeMerchantResponse>;

  makeAdmin(request: MakeAdminRequest, metadata?: Metadata): Observable<MakeAdminResponse>;
}

export interface UserServiceController {
  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  checkPassword(
    request: CheckPasswordRequest,
    metadata?: Metadata,
  ): Promise<CheckPasswordResponse> | Observable<CheckPasswordResponse> | CheckPasswordResponse;

  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  registerUser(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  updateUser(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  deleteUser(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  makeMerchant(
    request: MakeMerchantRequest,
    metadata?: Metadata,
  ): Promise<MakeMerchantResponse> | Observable<MakeMerchantResponse> | MakeMerchantResponse;

  makeAdmin(
    request: MakeAdminRequest,
    metadata?: Metadata,
  ): Promise<MakeAdminResponse> | Observable<MakeAdminResponse> | MakeAdminResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "find",
      "checkPassword",
      "get",
      "registerUser",
      "updateUser",
      "deleteUser",
      "makeMerchant",
      "makeAdmin",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
