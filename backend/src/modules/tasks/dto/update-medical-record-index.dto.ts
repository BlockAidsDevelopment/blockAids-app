import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecordsIndexesEnum } from "../enums/medical-records-indexes.enum";

export class UpdateMedicalRecordIndexDto {
  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  taskTypeId: string;

  @ApiProperty({ example: "CD4" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: MedicalRecordsIndexesEnum.text })
  @IsString()
  @IsNotEmpty()
  type: MedicalRecordsIndexesEnum;

  @ApiProperty({ example: "mm3" })
  @IsString()
  @MinLength(2, { message: "Unit must have at least 2 characters." })
  @IsNotEmpty()
  unit: string;
}
