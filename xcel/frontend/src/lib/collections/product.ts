import { Ingredient, IngredientProps } from 'lib/collections/ingredient'
import { Feature, FeatureProps } from 'lib/collections/feature'

export interface ProductProps {
  id: number;
  name : string;
  description: string;
  logo: string;
  features: FeatureProps[];
  ingredients: IngredientProps[];
  img_a: string;
  img_b: string;
  price: string;
}

export class Product  {
  id: number;
  ingredients : Ingredient[];
  features : Feature[];
  name : string ;
  description: string;
  logo: string;
  img_a: string;
  img_b: string;
  price: string;

  constructor (productData : ProductProps) {
    this.id = productData.id;
    this.name = productData.name
    this.description = productData.description
    this.logo = productData.logo
    this.img_a = productData.img_a
    this.img_b = productData.img_b
    this.price = productData.price
    this.ingredients = productData.ingredients.map(d => new Ingredient(d))
    this.features = productData.features.map(d => new Feature(d))
  }

}