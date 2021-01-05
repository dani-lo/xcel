import { Ingredient, IngredientProps } from './ingredient'

export interface ProductProps {
  id: number;
  name : string;
  description: string;
  logo: string;
  ingredients: IngredientProps[];
}

export class Product  {
  id: number;
  ingredients : Ingredient[]
  name : string ;
  description: string;
  logo: string;

  constructor (productData : ProductProps) {
    this.id = productData.id;
    this.name = productData.name
    this.description = productData.description
    this.logo = productData.logo
    this.ingredients = productData.ingredients.map(d => new Ingredient(d))
  }

}