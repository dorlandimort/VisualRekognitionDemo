import { VrRequest } from './vr_request';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { select: false })
  password: string;
  @Column('text')
  first_name: string;
  @Column('text')
  last_name: string;
  @Column('text', { nullable: true })
  mother_last_name: string;
  @Column('int', { default: 10 })
  allowed_requests_per_day: Number;

  @OneToMany(type => VrRequest, vrRequest => vrRequest.user)
  vrRequests: Promise<VrRequest[]>;
}
