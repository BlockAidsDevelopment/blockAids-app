import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreateMetadataDto {
  @ApiProperty({
    example: JSON.stringify(JSON.stringify({ id: "10", name: "John" })),
  })
  @IsNotEmpty()
  @IsString()
  @IsJSON()
  json: JSON;

  @ApiProperty({ example: "account.testnet" })
  @IsString()
  @IsNotEmpty()
  userId: any;
}
