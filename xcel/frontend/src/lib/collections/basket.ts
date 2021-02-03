import { Order } from "./order";

export interface BasketProps {
  id: number;
  instructions: string;
  orders: Order[];
}

export interface PaypalResponse {
  links: {
    href: string;
    rel: string;
    method: string;
  }[]
}

export class Basket {
  id: number;
  instructions: string;
  orders: Order[];

  constructor (doc : BasketProps) {
    this.id = doc.id
    this.instructions = doc.instructions
    this.orders = doc.orders
  }
}