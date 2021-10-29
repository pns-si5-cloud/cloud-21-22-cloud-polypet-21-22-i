import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity('cart')
export class Cart {
  constructor(clientID, totalPrice, lastModifDate, items) {
    this.clientID = clientID;
    this.totalPrice = totalPrice;
    this.lastModifDate = lastModifDate;
    this.items = items;
  }

  @PrimaryGeneratedColumn('uuid')
  cartID: string;

  @Column()
  clientID: string;

  @Column('double precision')
  totalPrice: number;

  @Column()
  lastModifDate: Date;

  @OneToMany((type) => Item, (items) => items.temporaryID)
  items: Item[];
}
