import React from 'react' 

import { getProducts } from '../../lib/api/productsApi'

export const ProductsList = async () => {

    const products = await getProducts()

    return products.data.map((product, i) => {
        return <div key={ `product-list-${ i }` }>
            <h2>{ product.name }</h2>
            <ul>
            {
                product.ingredients.map((ingredient, i) => {
                    return <li key={ `ingredient-list-${ i }` }>{ ingredient.name }</li>
                })
            }
            </ul>
        </div>
    })
}