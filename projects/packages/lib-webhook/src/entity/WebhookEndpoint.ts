import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";

@Entity()
export class WebhookEndpoint {

  @PrimaryGeneratedColumn()
  id: number;  // ID column

  @Column()
  isActive: boolean;  // Stores the state of the endpoint

  @Column({length: '512'})
  url: string; // Full url where data will be posted

  @Column({nullable: true })
  key: string; // public key for the endpoint

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}