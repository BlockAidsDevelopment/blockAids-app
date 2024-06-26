import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from "class-validator";
import { UserGenderEnum } from "../enums/user-gender.enum";
import { ApiProperty } from "@nestjs/swagger";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][A-Za-z\d@$!%*#?&_]{8,}$/;

export class UpdateUserDto {
  @ApiProperty({ example: "John Smith", required: false })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "johny@gmail.com", required: false })
  @ValidateIf((o) => "email" in o)
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide valid Email." })
  email: string;

  @ApiProperty({ example: "+3736091232", required: false })
  @ValidateIf((o) => "phone" in o)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: "account.testnet", required: false })
  @ValidateIf((o) => "account_id" in o)
  @IsString()
  @IsNotEmpty()
  account_id: string;

  @ApiProperty({
    example: "https://arweave.net/8UKWANOtnPtnknmC3ae6UPin9qNPqU8FJ7Yq5Xn4bFU",
    required: false,
  })
  @ValidateIf((o) => "ipfs_link" in o)
  @IsString()
  @IsNotEmpty()
  ipfs_link: string;

  @ApiProperty({ example: "1990-07-10", required: false })
  @ValidateIf((o) => "birthdate" in o)
  @IsOptional()
  @IsDateString()
  birthdate: Date | null;

  @ApiProperty({ example: UserGenderEnum.male, required: false })
  @ValidateIf((o) => "gender" in o)
  @IsString()
  @IsEnum([...Object.values(UserGenderEnum)])
  gender: string;

  @ApiProperty({ format: "binary", required: false })
  @ValidateIf((o) => "avatar" in o)
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: true, required: false })
  @ValidateIf((o) => "allowed" in o)
  @IsOptional()
  allowed: boolean;

  @ApiProperty({
    example: "https://avatars.githubusercontent.com/u/36919907",
    required: false,
  })
  @ValidateIf((o) => "avatar_link" in o)
  @IsString()
  @IsOptional()
  avatar_link: string;

  @ApiProperty({ example: "qwerQWER1234%$", required: false })
  @ValidateIf((o) => "password" in o)
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
