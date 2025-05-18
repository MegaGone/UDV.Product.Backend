import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("UserData")
export class UserData {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ nullable: false })
  DisplayName!: string;

  @Column({ unique: true, nullable: false })
  Email!: string;

  @Column({ nullable: false, default: 2 })
  Role!: number;

  @Column({ nullable: false })
  Password!: string;

  @Column({ default: () => "CURRENT_TIMESTAMP", nullable: false })
  CreatedAt!: Date;

  @Column({ nullable: false, default: true })
  Enabled!: boolean;

  @Column({ default: () => null, nullable: true })
  LockedDate!: Date;
}
