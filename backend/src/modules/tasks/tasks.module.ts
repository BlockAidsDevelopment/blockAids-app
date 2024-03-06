import { Module } from "@nestjs/common";
import { CrudTasksService } from "./services/crud-tasks.service";
import { TasksController } from "./controllers/tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskType } from "./entities/task-type.entity";
import { CrudTaskTypesService } from "./services/crud-task-types.service";
import { TaskTypeController } from "./controllers/task-type.controller";
import { Task } from "./entities/task.entity";
import { MedicalRecordsController } from "./controllers/medical-records.controller";
import { MedicalRecordIndexesController } from "./controllers/medical-record-indexes.controller";
import { MedicalRecords } from "./entities/medical-record.entity";
import { MedicalRecordIndex } from "./entities/medical-record-index.entity";
import { CrudMedicalRecordsService } from "./services/crud-medical-records.service";
import { CrudMedicalRecordIndexesService } from "./services/crud-medical-record-indexes.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskType,
      Task,
      MedicalRecords,
      MedicalRecordIndex,
    ]),
  ],
  controllers: [
    TaskTypeController,
    TasksController,
    MedicalRecordsController,
    MedicalRecordIndexesController,
  ],
  providers: [
    CrudTaskTypesService,
    CrudTasksService,
    CrudMedicalRecordsService,
    CrudMedicalRecordIndexesService,
  ],
})
export class TasksModule {}
