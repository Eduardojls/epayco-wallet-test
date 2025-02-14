import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Client } from './client.entity';
import { SessionTransaction } from './session-transaction.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  documentNumber: string;

  @Column()
  reference: string;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => SessionTransaction)
  @JoinColumn()
  sessionTransaction: SessionTransaction;
}
