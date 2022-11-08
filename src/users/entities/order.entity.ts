import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  user: User;

  @Column()
  products: Product[];
}
