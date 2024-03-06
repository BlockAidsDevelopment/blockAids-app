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
    this.task = new TasksResource(medicalRecord.task);
    this.medicalRecordIndex = new MedicalRecordIndexesResource(
      medicalRecord.medicalRecordIndex,
    );
    this.user = new UsersResource(medicalRecord.user);
    this.specialist = new SpecialistsResource(medicalRecord.specialist);
  }

  public static collect(medicalRecords: any[]): MedicalRecordsResource[] {
    return medicalRecords.map((medicalRecord) => {
      return new MedicalRecordsResource(medicalRecord);
    });
  }
}
