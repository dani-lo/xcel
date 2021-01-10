// import React from 'react'

// import { useXcelContext } from 'data/provider'

// import { Ingredient } from 'lib/collections/ingredient'
// import { Product } from 'lib/collections/product'


// export const ProductsList = async () => {

//     const { appstate } = useXcelContext()

//     return appstate.products.map((product : Product, i : number) => {
//         return <div key={ `product-list-${ i }` }>
//             <h2>{ product.name }</h2>
//             <ul>
//             {
//                 product.ingredients.map((ingredient : Ingredient, i) => {
//                     return <li key={ `ingredient-list-${ i }` }>{ ingredient.name }</li>
//                 })
//             }
//             </ul>
//         </div>
//     })
// }