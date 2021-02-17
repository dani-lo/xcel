export interface OrderProps {
  id: number;
  status : string;
  product_id: number;
  unit_price: number;
  quantity: number;
}

export class Order  {
  id: number;
  status : string;
  product_id: number;
  unit_price: number;
  quantity: number;

  constructor (orderData : OrderProps) {
    this.id = orderData.id;
    this.status = orderData.status
    this.product_id = orderData.product_id
    this.unit_price = orderData.unit_price
    this.quantity = orderData.quantity
  }

}