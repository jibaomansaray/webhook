import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { WebhookApp } from "./WebhookApp";
import { WebhookTopic } from "./WebhookTopic";

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

  @ManyToOne(() => WebhookTopic, { nullable: false })
  @JoinColumn()
  topic: number

  @ManyToOne(()=> WebhookApp, { nullable: false })
  @JoinColumn()
  app: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}