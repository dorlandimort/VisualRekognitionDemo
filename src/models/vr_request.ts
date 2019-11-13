import { User } from './user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

@Entity('vr_requests')
export class VrRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('date')
  date_requested: string;
  @Column('bigint')
  userId: Number;

  @ManyToOne(type => User, user => user.vrRequests, {
    onDelete: 'CASCADE'
  })
  user: User;
}
