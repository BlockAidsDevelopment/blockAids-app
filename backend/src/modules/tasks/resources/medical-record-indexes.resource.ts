import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { TaskTypeResource } from "./task-type.resource";
import { MedicalRecordIndex } from "../entities/medical-record-index.entity";

@Injectable()
export class MedicalRecordIndexesResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "CD4" })
  public name: string;
  @ApiProperty({ example: "mm3" })
  public unit: string;
  @ApiProperty({ example: TaskTypeResource })
  public taskType: TaskTypeResource;

  public constructor(medicalRecordIndex: MedicalRecordIndex) {
    this.id = medicalRecordIndex.id;
    this.name = medicalRecordIndex.name;
    this.unit = medicalRecordIndex.unit;
    this.taskType = new TaskTypeResource(medicalRecordIndex.taskType);
  }

  public static collect(
    medicalRecordIndexes: any[],
  ): MedicalRecordIndexesResource[] {
    return medicalRecordIndexes.map((medicalRecordIndex) => {
      return new MedicalRecordIndexesResource(medicalRecordIndex);
    });
  }
}
