import { Injectable } from '@nestjs/common';
import {Hotel, STATUS} from '../stubs/hotel/v1alpha/hotel';
import { Prisma } from '@prisma/client';
import {PrismaService} from "../prisma.service";

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {}
	create(data: Prisma.HotelCreateInput): Promise<Hotel> {
		return this.prisma.hotel.create({ data }) as any;
	}

	findAll(): Promise<Hotel[]> {
		return this.prisma.hotel.findMany() as any;
	}

	findById(id: number): Promise<Hotel> {
		return this.prisma.hotel.findUnique({
			where: { id },
		}) as any;
	}
	pendingHotel(): Promise<Hotel[]> {
		return this.prisma.hotel.findMany({
			where: { status:"PENDING" },
		}) as any;
	}

	async update(id: number, data: Prisma.HotelUpdateInput): Promise<Hotel> {
		return this.prisma.hotel.update({
			where: { id },
			data,
		}) as any;
	}

	delete(id: number): Promise<Hotel> {
		return this.prisma.hotel.delete({
			where: { id },
		}) as any;
	}
}