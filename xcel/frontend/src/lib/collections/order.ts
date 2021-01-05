export interface OrderProps {
  id: number;
  name : string;
  description: string;
  logo: string;
}

export class Order  {
  id: number;
  name : string ;
  description: string;
  logo: string;

  constructor (productData : OrderProps) {
    this.id = productData.id;
    this.name = productData.name
    this.description = productData.description
    this.logo = productData.logo
  }

}