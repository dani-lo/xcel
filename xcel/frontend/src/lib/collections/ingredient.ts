export interface IngredientProps {
  name : string;description: string;
}

export class Ingredient {
  name: string;
  description: string;

  constructor (doc : IngredientProps) {
    this.name = doc.name
    this.description = doc.description
  }
}