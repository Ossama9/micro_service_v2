/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "announce.v1alpha";

export interface Announce {
  id?: number | undefined;
  name?: string | undefined;
  price?: number | undefined;
  hotelId?: string | undefined;
}

export interface GetRequest {
  id?: number | undefined;
}

export interface GetResponse {
  announces?: Announce[] | undefined;
}

export interface AddRequest {
  name?: string | undefined;
  price?: number | undefined;
  hotelId?: string | undefined;
}

export interface AddResponse {
  announce?: Announce | undefined;
}

export interface UpdateRequest {
  id?: number | undefined;
  name?: string | undefined;
  price?: number | undefined;
  hotelId?: string | undefined;
}

export interface UpdateResponse {
  announce?: Announce | undefined;
}

export interface DeleteRequest {
  id?: number | undefined;
}

export interface DeleteResponse {
  announce?: Announce | undefined;
}

export const ANNOUNCE_V1ALPHA_PACKAGE_NAME = "announce.v1alpha";

export interface AnnounceCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface AnnounceCRUDServiceController {
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
}

export function AnnounceCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AnnounceCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AnnounceCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ANNOUNCE_CR_UD_SERVICE_NAME = "AnnounceCRUDService";
