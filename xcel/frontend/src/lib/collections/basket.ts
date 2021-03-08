import { Order } from "./order";

export interface BasketProps {
  id: number;
  instructions: string;
  orders: Order[];
  total: number;
}

export interface PaypalResponse {
  error ?: string;
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
  total: number;

  constructor (doc : BasketProps) {
    this.id = doc.id
    this.instructions = doc.instructions
    this.orders = doc.orders
    this.total = doc.total
  }
}