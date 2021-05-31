import React, { useState } from 'react';

import { Product } from 'lib/collections/product'
import { Ingredient } from 'lib/collections/ingredient'

import { CreateOrder } from 'components/orders/create'

import { useFadeIn } from 'hooks/useTransition'

import { IngredientsModal } from 'components/widget/ingredients'

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

  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  const { update } = useXcelContext()
  
  const onBuyProduct = async (q: number) => {

    buyProduct(p, q)

    // try {
    //   buyProduct(p, q)

    //   const newBasketData = await userBasket()
    //   const newBasket = new Basket(newBasketData.data)

    //   update({
    //     type: REDUCER_ACTIONS.INIT_BASKET,
    //     payload: {
    //       basket: newBasket
    //     }
    //   })

    //   notifySuccess(update, 'Your order was added')
    // } catch (err) {
    //   console.log(err)
    //   notifyError(update, 'Your order could not be added')
    // }
    
  }

  return <XProduct  className={ `${ cname }` }>
    <div className="fw">
      <div className="headshot">
        <img src={ p.img_a } /> 
        <ul>
          {
            p.features.map((feature : Ingredient, i: number) => {
              return <li key={ `feature-${ i }` }>
                { feature.description }
              </li>
            })
          }
        </ul>
        <div>
        {/* {
          loggedIn ? <CreateOrder onBuyProduct={ onBuyProduct } /> : null
        } */}
          <CreateOrder onBuyProduct={ onBuyProduct } />
        </div>
      </div>
      <div>
        <h3 className="prod-title">{ p.name }</h3>
        <p className="margin-dub-bottom margin-dub-top txt-jumbo">&pound;{ p.price }</p>
        <p>{ p.description }</p>
        <ul>
          {
            p.ingredients.slice(0, 2).map((ingredient : Ingredient, i: number) => {
              return <li key={ `ingredient-${ i }` }>
                <h3 className="txt-small cap">{ ingredient.name }</h3>
                <p>{ ingredient.description }</p>
              </li>
            })
          }
        </ul>
        <XButton
            size="small"
            onClick={ () => setIngredients(p.ingredients) }
          >View All Ingredients</XButton>
      </div>
    </div>
    <div className="rw">
      <h3 className="prod-title">{ p.name }</h3>
      <div className="flex-row padding-top" style={{ justifyContent: 'center' }}>
        <img src={ p.img_a } /> 
      </div>
      <p className="flex-row padding-bottom">{ p.description }</p>
      <XButton
        size="small"
        onClick={ () => setIngredients(p.ingredients) }
      >
        View All Ingredients
      </XButton>
      <div className="margin-dub-top padding-dub-top">
        <p className="txt-jumbo">&pound;{ p.price }</p>
        {
          loggedIn ? <CreateOrder onBuyProduct={ onBuyProduct } /> : null
        }
      </div>
    </div>
    {
      ingredients.length ? <IngredientsModal
        ingredients={ ingredients }
        closeModal={ () => setIngredients([])}
      /> : null
    }
    
  </XProduct>
}