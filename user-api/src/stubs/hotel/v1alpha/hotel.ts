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
  name?: string | undefined;
  id?: number | undefined;
  city?: string | undefined;
  address?: string | undefined;
  userId?: string | undefined;
  status?: STATUS | undefined;
}

export interface GetRequest {
  id?: number | undefined;
}

export interface GetResponse {
  hotels?: Hotel[] | undefined;
}

export interface AddRequest {
  name?: string | undefined;
  city?: string | undefined;
  address?: string | undefined;
  userId?: string | undefined;
}

export interface AddResponse {
  hotel?: Hotel | undefined;
}

export interface UpdateRequest {
  id?: number | undefined;
  name?: string | undefined;
  city?: string | undefined;
  address?: string | undefined;
  status?: STATUS | undefined;
}

export interface UpdateResponse {
  hotel?: Hotel | undefined;
}

export interface DeleteRequest {
  id?: number | undefined;
}

export interface DeleteResponse {
  hotel?: Hotel | undefined;
}

export interface PendingHotelRequest {
  id?: number | undefined;
}

export interface PendingHotelResponse {
  hotels?: Hotel[] | undefined;
}

export interface ApproveHotelRequest {
  id?: number | undefined;
}

export interface ApproveHotelResponse {
  hotel?: Hotel | undefined;
}

export const HOTEL_V1ALPHA_PACKAGE_NAME = "hotel.v1alpha";

export interface HotelServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  pendingHotel(request: PendingHotelRequest, metadata?: Metadata): Observable<PendingHotelResponse>;

  approveHotel(request: ApproveHotelRequest, metadata?: Metadata): Observable<ApproveHotelResponse>;
}

export interface HotelServiceController {
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

export function HotelServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete", "pendingHotel", "approveHotel"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HotelService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HotelService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HOTEL_SERVICE_NAME = "HotelService";
