import { Picture } from './picture';
import { Category } from './category';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  name: string;
  @Column('text')
  description: string;
  @Column('bigint')
  categoryId: Number;

  @OneToMany(type => Picture, picture => picture.product)
  pictures: Promise<Picture[]>;
  @ManyToOne(type => Category, category => category.products, {
    onDelete: 'CASCADE'
  })
  category: Category;
}
