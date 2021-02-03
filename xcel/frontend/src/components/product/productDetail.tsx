import React from 'react';

import { Product } from '../../lib/collections/product'
import { Ingredient } from '../../lib/collections/ingredient'

import { useFadeIn } from '../../hooks/useTransition'

import { XButton, XProduct } from '../../styles/styled'

export const ProductDetail = ({ p, buyProduct, loggedIn } : { p : Product, buyProduct: (p: Product) => void, loggedIn: boolean }) => {

  const cname = useFadeIn(500)

  return <XProduct  className={ `margin-top margin-bottom padding-top padding-bottom ${ cname }` }>
    <div className="headshot">
      <img src={ p.img_b } /> 
    </div>
    <h3  className="txt-medium padding-dub-top padding-dub-bottom">{ p.name }</h3>
    <p className="txt-small padding-dub-bottom">{ p.description }</p> 
    <ul>
    {
      p.ingredients.map((ingredient : Ingredient, i: number) => {
        return <li key={ `ingredient-${ i }` }>
          <h3 className="txt-small">{ ingredient.name }</h3>
          <p  className="txt-small">{ ingredient.description }</p>
        </li>
      })
    }
    </ul>
    {
      loggedIn ? <XButton size="small" onClick={ () => buyProduct(p) }>buy</XButton> : null
    }
  </XProduct>
}