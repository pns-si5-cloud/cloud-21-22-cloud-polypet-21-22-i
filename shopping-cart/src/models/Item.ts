import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart';

@Entity('item')
export class Item {

  @PrimaryGeneratedColumn()
  temporaryID: number;

  @Column()
  productID: string;

  @Column('int')
  quantity: number;

  @Column('double precision')
  productPrice: number;

  @Column()
  productName: string;

  @ManyToOne(()=> Cart, cart => cart.items)
  cart: Cart;
}
