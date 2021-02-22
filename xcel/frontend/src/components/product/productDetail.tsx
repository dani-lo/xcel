import React from 'react';

import { Product } from 'lib/collections/product'
import { Ingredient } from 'lib/collections/ingredient'

import { CreateOrder } from 'components/orders/create'

import { useFadeIn } from 'hooks/useTransition'

import { XButton, XProduct } from 'styles/styled'

import { userBasket } from 'lib/api/basketApi'
import { Basket } from 'lib/collections/basket'

import { useXcelContext } from 'data/provider'
import { REDUCER_ACTIONS } from 'data/reducer'
import { notifyError, notifySuccess } from 'data/shortcuts';

interface Props { 
  p : Product; 
  buyProduct: (p: Product, q: number) => void; 
  loggedIn: boolean;
}

export const ProductDetail = ({ p, buyProduct, loggedIn } : Props) => {

  const cname = useFadeIn(500)

  const { update } = useXcelContext()

  const onBuyProduct = async (q: number) => {

    try {
      buyProduct(p, q)

      const newBasketData = await userBasket()
      const newBasket = new Basket(newBasketData.data)

      update({
        type: REDUCER_ACTIONS.INIT_BASKET,
        payload: {
          basket: newBasket
        }
      })

      notifySuccess(update, 'Your order was added')
    } catch (err) {
      notifyError(update, 'Your order could not be added')
    }
    
  }

  return <XProduct  className={ `${ cname }` }>
    <div>
      <div className="headshot">
        <img src={ p.img_a } /> 
        <ul>
          {
            p.features.map((feature : Ingredient, i: number) => {
              return <li key={ `feature-${ i }` }>
                <h3 className="txt-small cap">{ feature.description }</h3>
              </li>
            })
          }
        </ul>
        <div className="margin-dub-top padding-top">
        {
          loggedIn ? <CreateOrder onBuyProduct={ onBuyProduct } /> : null
        }
        </div>
      </div>
      <div className="padding-left">
        <h3  className="txt-jumbo padding-dub-top padding-bottom">{ p.name }</h3>
        <p className="txt-jumbo price padding-bottom">&pound;{ p.price }</p>
        <p className="txt-small margin-top">{ p.description }</p>
        <ul className="margin-dub-top">
          {
            p.ingredients.slice(0, 2).map((ingredient : Ingredient, i: number) => {
              return <li key={ `ingredient-${ i }` } className="padding-bottom">
                <h3 className="txt-small cap">{ ingredient.name }</h3>
                <p  className="txt-small">{ ingredient.description }</p>
              </li>
            })
          }
          <XButton
            size="small"
            onClick={ () => void 0 }
          >View All Ingredients</XButton>
        </ul>
      </div>
    </div>
    <div>
      
      <div className="padding-left">
        
      </div>
    </div>
    
  </XProduct>
}