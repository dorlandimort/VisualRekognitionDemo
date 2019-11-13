import { Product } from './product';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  name: string;
  @Column('text', { nullable: true })
  path: string;
  @Column('text', { nullable: true })
  s3_key: string;
  order_position: Number;
  @Column('bigint')
  productId: Number;

  @ManyToOne(type => Product, product => product.pictures)
  product: Product;
}
