import { Product } from './product';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  name: string;
  @Column('text', { nullable: true })
  description: string;
  @Column('text')
  slug: string;
  @OneToMany(type => Product, product => product.category)
  products: Promise<Product[]>;
}
