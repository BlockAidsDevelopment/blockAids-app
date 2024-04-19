import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMetadataDto {
  @ApiProperty({ example: `{ id: 10 }` })
  @IsNotEmpty()
  @IsString()
  json: string;

  @ApiProperty({ example: "account.testnet" })
  @IsString()
  @IsNotEmpty()
  userId: any;
}
