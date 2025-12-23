import {
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(150)
  age?: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email?: string;

  constructor(data: Partial<UserDto>) {
    Object.assign(this, data);
  }
}
