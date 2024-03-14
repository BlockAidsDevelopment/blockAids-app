import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { TasksResource } from "./tasks.resource";
import { UsersResource } from "../../users/resources/users.resource";
import { SpecialistsResource } from "../../specialists/resources/specialists.resource";
import { MedicalRecords } from "../entities/medical-record.entity";
import { MedicalRecordIndexesResource } from "./medical-record-indexes.resource";

@Injectable()
export class MedicalRecordsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "Negative" })
  public value: string;
  @ApiProperty({ example: true })
  public saved: boolean;
  @ApiProperty({ example: "12.02.2023" })
  public created_at: Date;
  @ApiProperty({ example: TasksResource })
  public task: TasksResource;
  @ApiProperty({ example: MedicalRecordIndexesResource })
  public medicalRecordIndex: MedicalRecordIndexesResource;
  @ApiProperty({ example: UsersResource })
  public user: UsersResource;
  @ApiProperty({ example: SpecialistsResource })
  public specialist: SpecialistsResource;

  public constructor(medicalRecord: MedicalRecords) {
    this.id = medicalRecord.id;
    this.value = medicalRecord.value;
    this.saved = medicalRecord.saved;
    this.created_at = medicalRecord.created_at;
    this.task = medicalRecord.task
      ? new TasksResource(medicalRecord.task)
      : null;
    this.medicalRecordIndex = medicalRecord.medicalRecordIndex
      ? new MedicalRecordIndexesResource(medicalRecord.medicalRecordIndex)
      : null;
    this.user = medicalRecord.user
      ? new UsersResource(medicalRecord.user)
      : null;
    this.specialist = medicalRecord.specialist
      ? new SpecialistsResource(medicalRecord.specialist)
      : null;
  }

  public static collect(medicalRecords: any[]): MedicalRecordsResource[] {
    return medicalRecords.map((medicalRecord) => {
      return new MedicalRecordsResource(medicalRecord);
    });
  }
}
