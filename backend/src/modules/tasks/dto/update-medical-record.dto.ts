import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMedicalRecordDto {
  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  specialistId: string;

  @ApiProperty({ example: "1" })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({ example: "1" })
  @IsString()
  @IsNotEmpty()
  medicalRecordIndexId: string;

  @ApiProperty({ example: "Negative" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  value: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @ValidateIf((o) => "saved" in o)
  saved: boolean;
}
