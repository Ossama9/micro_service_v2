import { IsEmail, Length } from 'class-validator';

export class CreateHotelDto {
	name: string;
	city: string;
	address: string;
	userId: string;
}
