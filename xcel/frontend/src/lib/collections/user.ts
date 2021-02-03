import { Order } from './order';

export interface UserProps {
  id: number;
  email : string;
  orders: Order[];
}

export class User  {
  id: number;
  email : string;
  orders: Order[];

  constructor (userData : UserProps) {
    this.id = userData.id;
    this.email = userData.email
    this.orders = userData.orders
  }

}