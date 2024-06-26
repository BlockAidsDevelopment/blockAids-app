import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserGenderEnum } from "../enums/user-gender.enum";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 40 })
  email: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  account_id: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  ipfs_link: string;

  @Column({ type: "date", nullable: true })
  birthdate: Date | null;

  @Column({ type: "varchar" })
  password: string;

  @Column({
    type: "enum",
    enum: [...Object.values(UserGenderEnum)],
    default: UserGenderEnum.male,
  })
  gender: string;

  @Column({ type: "varchar", length: 255, default: "avatar-mock.png" })
  avatar: string;

  @Column({ type: "boolean", default: 0 })
  allowed: boolean;

  @Column({
    type: "varchar",
    length: 255,
    default: "https://avatars.githubusercontent.com/u/36919907",
  })
  avatar_link: string;

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
