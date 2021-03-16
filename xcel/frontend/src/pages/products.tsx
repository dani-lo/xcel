import React from 'react';

import { Product } from 'lib/collections/product'

import { placeOrder } from 'lib/api/ordersApi'
import { createBasket } from 'lib/api/basketApi'

import { useXcelContext } from 'data/provider'
import { notifySuccess, notifyError } from 'data/shortcuts'

import { ProductDetail } from 'components/product/productDetail'

import { XSection, XPageTitle, XScroller, XContentMain } from 'styles/styled'

export const ProductsPage = () => {

  const { appstate, update } = useXcelContext()
  
  const products = appstate.products
  const basket = appstate.basket
  const user = appstate.user

  const buyProduct = async (p : Product, quantity: number) => {

    if (!!basket) {
      placeOrder(p, basket, quantity) 
    } else {

      try {
        const newBasket = await createBasket()

        placeOrder(p, newBasket.data, 1) 
        
        notifySuccess(update, 'Order added to your basket')
      } catch (err) {

        notifyError(update, 'Order could not be added')
      }
    } 
  }

  return <XContentMain>
    <XPageTitle className="cap">Organic Creams</XPageTitle>
    <XSection highlight>
      <p>Our natural face creams will be sure to up your beauty routine with a mix of delicious oils and superfoods.</p>
      <p>This range of natural and organic moisturisers will leave your skin feeling soft and nourished whilst protecting against elements such as UV exposure and environmental stressors.</p>
    </XSection>
    <XScroller>
      {
        products.map((p : Product, i : number) => <XSection key={ `product-${ i }` }>
            <ProductDetail
              p={ p }
              buyProduct={ buyProduct}
              loggedIn={ !!user }
            />
        </XSection>)
      }
    </XScroller>
  </XContentMain>
}