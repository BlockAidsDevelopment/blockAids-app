import {IUser} from "./IUser";
import {ISpecialist} from "./ISpecialist";
import {ITaskType} from "./ITaskType";
import {IOrganizations} from "./IOrganizations";

export interface ITask {
  id?: number,
  name: string,
  dateDue: string,
  status: any,
  points: number,
  pay_signature: string,
  description: string,
  user: IUser,
  specialist: ISpecialist,
  taskType: ITaskType,
  organization: IOrganizations,
}
