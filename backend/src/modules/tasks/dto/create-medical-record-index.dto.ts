import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecordsIndexesEnum } from "../enums/medical-records-indexes.enum";

export class CreateMedicalRecordIndexDto {
  @ApiProperty({ example: "1" })
  @IsNotEmpty()
  taskTypeId: string;

  @ApiProperty({ example: "CD4" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  @ValidateIf((o) => "name" in o)
  name: string;

  @ApiProperty({ example: MedicalRecordsIndexesEnum.text })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "type" in o)
  type: MedicalRecordsIndexesEnum;

  @ApiProperty({ example: "mm3" })
  @IsString()
  @ValidateIf((o) => "unit" in o)
  @IsNotEmpty()
  unit: string;
}
