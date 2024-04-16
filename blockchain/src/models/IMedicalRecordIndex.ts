import {ITaskType} from "./ITaskType";

export interface IMedicalRecordIndex {
  id: number;
  name: string;
  unit: string;
  type: string;
  taskType: ITaskType;
}