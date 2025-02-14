import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Transaction } from './transaction.entity';
import { StringLiteral } from 'typescript';

@Entity()
export class SessionTransaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column()
  idSession: string;

  @Column()
  documentNumber: string;

  @Column()
  token: string;

  @Column()
  status: string;

  @Column()
  sessionStatus: string;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Transaction)
  transaction: Transaction;
}
