import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TaskType } from "./task-type.entity";
import { MedicalRecordsIndexesEnum } from "../enums/medical-records-indexes.enum";

@Entity()
export class MedicalRecordIndex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  taskTypeId: string;

  @ManyToOne(() => TaskType)
  taskType: TaskType;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({
    type: "varchar",
    default: MedicalRecordsIndexesEnum.text,
  })
  type: MedicalRecordsIndexesEnum;

  @Column({ type: "varchar", length: 255 })
  unit: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
