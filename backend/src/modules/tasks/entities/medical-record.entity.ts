import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Specialist } from "../../specialists/entities/specialist.entity";
import { MedicalRecordIndex } from "./medical-record-index.entity";
import { Task } from "./task.entity";

@Entity()
export class MedicalRecords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  taskId: string;

  @ManyToOne(() => Task)
  task: Task;

  @Column({ type: "uuid" })
  medicalRecordIndexId: string;

  @ManyToOne(() => MedicalRecordIndex)
  medicalRecordIndex: MedicalRecordIndex;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: "uuid" })
  specialistId: string;

  @ManyToOne(() => Specialist)
  specialist: User;

  @Column({ type: "varchar", length: 255 })
  value: string;

  @Column({ type: "int", default: 0 })
  saved: boolean;

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
