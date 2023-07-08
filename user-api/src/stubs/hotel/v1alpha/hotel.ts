/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hotel.v1alpha";

export enum STATUS {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export interface Hotel {
  name?: string;
  id?: number;
  city?: string;
  address?: string;
  userId?: string;
  status?: STATUS;
}

export interface GetRequest {
  id?: number;
}

export interface GetResponse {
  hotels?: Hotel[];
}

export interface AddRequest {
  name?: string;
  city?: string;
  address?: string;
  userId?: string;
}

export interface AddResponse {
  hotel?: Hotel;
}

export interface UpdateRequest {
  id?: number;
  name?: string;
  city?: string;
  address?: string;
  status?: STATUS;
}

export interface UpdateResponse {
  hotel?: Hotel;
}

export interface DeleteRequest {
  id?: number;
}

export interface DeleteResponse {
  hotel?: Hotel;
}

export interface PendingHotelRequest {
  id?: number;
}

export interface PendingHotelResponse {
  hotels?: Hotel[];
}

export interface ApproveHotelRequest {
  id?: number;
}

export interface ApproveHotelResponse {
  hotel?: Hotel;
}

export const HOTEL_V1ALPHA_PACKAGE_NAME = "hotel.v1alpha";

export interface HotelCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  pendingHotel(request: PendingHotelRequest, metadata?: Metadata): Observable<PendingHotelResponse>;

  approveHotel(request: ApproveHotelRequest, metadata?: Metadata): Observable<ApproveHotelResponse>;
}

export interface HotelCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  pendingHotel(
    request: PendingHotelRequest,
    metadata?: Metadata,
  ): Promise<PendingHotelResponse> | Observable<PendingHotelResponse> | PendingHotelResponse;

  approveHotel(
    request: ApproveHotelRequest,
    metadata?: Metadata,
  ): Promise<ApproveHotelResponse> | Observable<ApproveHotelResponse> | ApproveHotelResponse;
}

export function HotelCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete", "pendingHotel", "approveHotel"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HotelCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HotelCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HOTEL_CR_UD_SERVICE_NAME = "HotelCRUDService";
