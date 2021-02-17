export interface FeatureProps {
  name : string;description: string;
}

export class Feature {
  name: string;
  description: string;

  constructor (doc : FeatureProps) {
    this.name = doc.name
    this.description = doc.description
  }
}