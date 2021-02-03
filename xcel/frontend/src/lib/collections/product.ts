import { Ingredient, IngredientProps } from './ingredient'

export interface ProductProps {
  id: number;
  name : string;
  description: string;
  logo: string;
  ingredients: IngredientProps[];
  img_a: string;
  img_b: string;
  price: number;
}

export class Product  {
  id: number;
  ingredients : Ingredient[]
  name : string ;
  description: string;
  logo: string;
  img_a: string;
  img_b: string;
  price: number;

  constructor (productData : ProductProps) {
    this.id = productData.id;
    this.name = productData.name
    this.description = productData.description
    this.logo = productData.logo
    this.img_a = productData.img_a
    this.img_b = productData.img_b
    this.price = productData.price
    this.ingredients = productData.ingredients.map(d => new Ingredient(d))
  }

}