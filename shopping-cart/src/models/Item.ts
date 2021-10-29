import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class Item {
  constructor(productID, quantity, productPrice, productName) {
    this.productID = productID;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productName = productName;
  }

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
}
