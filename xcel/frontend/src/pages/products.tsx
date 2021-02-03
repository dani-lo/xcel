import React from 'react';

import { Product } from '../lib/collections/product'

import { placeOrder } from '../lib/api/ordersApi'
import { createBasket } from '../lib/api/basketApi'

import { useXcelContext } from '../data/provider'
import { REDUCER_ACTIONS } from '../data/reducer'

import { NotificationType } from '../components/widget/notifiction'
import { ProductDetail } from '../components/product/productDetail'

import { XSection } from '../styles/styled'

export const ProductsPage = () => {

  const { appstate, update } = useXcelContext()
  
  const products = appstate.products
  const basket = appstate.basket
  const user = appstate.user

  const buyProduct = async (p : Product) => {

    if (!!basket) {
      placeOrder(p, basket, 1) 
    } else {

      try {
        const newBasket = await createBasket()

        placeOrder(p, newBasket.data, 1) 
        
        update({
          type: REDUCER_ACTIONS.INIT_BASKET,
          payload: {
            basket: newBasket.data
          }
        })

        update({
          type: REDUCER_ACTIONS.NOTIFY,
          payload: {
            msg: 'Order added to your basket',
            type: NotificationType.SUCCESS,
            donotify: true
          }
        })
        
      } catch (err) {

        update({
          type: REDUCER_ACTIONS.NOTIFY,
          payload: {
            msg: 'Order could not be added',
            type: NotificationType.ERROR,
            donotify: true
          }
        })
      }
    } 
  }

  return <>
  {
    products.map((p : Product, i : number) => <XSection key={ `product-${ i }` }>
        <ProductDetail
          p={ p }
          buyProduct={ buyProduct}
          loggedIn={ !!user }
        />
    </XSection>)
    }
  </>
}