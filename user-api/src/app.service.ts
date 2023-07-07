import {Injectable} from '@nestjs/common';
import {User} from './stubs/user/v1alpha/user';
import {PrismaService} from './prisma.service';
import {Prisma, Role} from '@prisma/client';

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		if ((await this.findAll()).length === 0) {
			data.role = Role.ADMIN;
		}
		return this.prisma.user.create({
			data,
		}) as any;
	}

	findAll(): Promise<User[]> {
		return this.prisma.user.findMany() as any;
	}

	findById(id: number): Promise<User> {
		return this.prisma.user.findUnique({
			where: {id},
		}) as any;
	}
	findByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {email},
		}) as any;
	}

	async update(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const {where, data} = params;
		return this.prisma.user.update({
			data,
			where,
		}) as any;
	}

	delete(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: {id},
		}) as any;

	}
}