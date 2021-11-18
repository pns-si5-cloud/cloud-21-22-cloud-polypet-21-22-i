import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity('cart')
export class Cart {


  @PrimaryGeneratedColumn('uuid')
  cartID: string;

  @Column()
  clientID: string;

  @Column('double precision')
  totalPrice: number;

  @Column()
  lastModifDate: Date;

  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];
}
