import React from 'react';

import { Product } from '../lib/collections/product'
import { placeOrder } from '../lib/api/ordersApi'

import { fade } from '../lib/util/animate'

import { XButton, XProduct } from '../styles/styled'
import { useXcelContext } from '../data/provider'

export const ProductsPage = () => {

  const { appstate } = useXcelContext()

  const products = appstate.products

  return <div className={ fade(products.length > 0) }>
    <h1 className="txt-large margin padding-dub txt-center">Xcel products!</h1>
      {
        products.map((p : Product, i : number) => {
          return <XProduct key={`product-${ i }`} className="product margin-top margin-bottom padding-top padding-bottom">
              <img src={ p.logo } />
              <div className="padding">
                <h3  className="txt-medium padding-dub-top padding-dub-bottom">{ p.name }</h3>
                <p className="txt-small padding-dub-bottom">{ p.description }</p> 
                <XButton size="small" onClick={ () => placeOrder(p, 1) }>buy</XButton>
              </div>
          </XProduct>
        })
      }
  </div>
	
}