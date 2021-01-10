import { Order } from './order';

export interface UserProps {
  id: number;
  username : string;
  orders: Order[];
}

export class User  {
  id: number;
  username : string;
  orders: Order[];

  constructor (userData : UserProps) {
    this.id = userData.id;
    this.username = userData.username
    this.orders = userData.orders
  }

}