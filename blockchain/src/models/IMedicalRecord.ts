import {ITask} from "./ITask";
import {IMedicalRecordIndex} from "./IMedicalRecordIndex";
import {IUser} from "./IUser";
import {ISpecialist} from "./ISpecialist";

export interface IMedicalRecord {
  id: number;
  value: string;
  saved: boolean;
  created_at: string;
  task: ITask;
  medicalRecordIndex: IMedicalRecordIndex;
  user: IUser;
  specialist: ISpecialist;
}