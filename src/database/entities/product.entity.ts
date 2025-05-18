import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("ProductData")
export class ProductData {
  @PrimaryGeneratedColumn("uuid")
  Id!: string;

  @Column({ type: "varchar", length: 100 })
  @Index({ unique: true })
  Name!: string;

  @Column({ type: "text", nullable: true })
  Description!: string | null;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  UnitPrice!: number;

  @Column({ type: "int" })
  Stock!: number;

  @Column({ type: "boolean", default: true })
  IsAvailable!: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  Sku?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  Category?: string;

  @Column({ type: "enum", enum: ["active", "inactive", "discontinued"], default: "active" })
  Status!: "active" | "inactive" | "discontinued";

  @Column({
    type: "json",
    nullable: true,
  })
  Attributes!: Record<string, any> | null;

  @CreateDateColumn({ type: "timestamp" })
  CreatedAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  UpdatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  DeletedAt!: Date;
}
