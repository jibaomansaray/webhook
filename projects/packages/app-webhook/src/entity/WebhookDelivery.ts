import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
  ManyToOne
} from "typeorm";
import { WebhookEndpoint } from "./WebhookEndpoint";
import { WebhookEvent } from "./WebhookEvent";

@Entity()
export class WebhookDelivery {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WebhookEndpoint, { nullable: false })
  @JoinColumn()
  endpoint: number;

  @ManyToOne(() => WebhookEvent)
  @JoinColumn()
  event: number;

  @Column()
  status: string;

  @VersionColumn()
  attempts: number;

  @Column({type: "datetime"})
  nextAttempt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}