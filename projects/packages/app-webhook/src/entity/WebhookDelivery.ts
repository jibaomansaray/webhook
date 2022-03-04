import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn } from "typeorm";
import { WebhookEndpoint } from "./WebhookEndpoint";

@Entity()
export class WebhookDelivery {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => WebhookEndpoint )
  @JoinColumn()
  endpoint: number;

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