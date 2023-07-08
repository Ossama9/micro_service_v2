import {Injectable} from '@nestjs/common';
import {User} from './stubs/user/v1alpha/user';
import {PrismaService} from './prisma.service';
import {Prisma, Role} from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

	async users(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<User[]> {
		const {skip, take, cursor, where, orderBy} = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
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
	async checkPassword(
		email: string,
		password: string,
	): Promise<{ user: User; match: boolean }> {
		const user = await this.prisma.user.findUnique({
			where: {email},
			select: {
				createdAt: true,
				email: true,
				firstName: true,
				id: true,
				lastName: true,
				updatedAt: true,
				password: true,
				role: true,
			},
		}) as any;

		if (!user) {
			return {user: null, match: false};
		}

		const match = await bcrypt.compare(password, user.password);

		return {user, match};
	}


	delete(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: {id},
		}) as any;
	}

}