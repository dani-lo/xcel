import React, { useEffect, useState } from 'react';

import { Product, ProductProps } from '../../lib/collections/product'
import { getProducts } from '../../lib/api/productsApi'
import { placeOrder } from '../../lib/api/ordersApi'

import { fade } from '../../lib/util/animate'

export const ProductsPage = () => {

  const [products, setProducts] = useState([])

	const load = async () => {
		const res = await getProducts()
    const apiProducts = res.data.map((d  : ProductProps) => new Product(d))
    
    setProducts(apiProducts)
	}

  useEffect(() => {
    load()
  }, [])


  return <div className={ fade(products.length > 0) }>
    <h1>Xcel products!</h1>
    <div>
      {
        products.map((p : Product, i : number) => {
          return <div key={`product-${ i }`}>
            <h3>{ p.name }</h3>
            <p>{ p.description }</p>
            <img src={ p.logo } />
            <div>
              <button onClick={ () => placeOrder(p, 1) }>BUY</button>
            </div>
          </div>
        })
      }
    </div>
  </div>
	
}