import { getUser } from 'lib/api/userAPi'
import { getProducts } from 'lib/api/productsApi'
import { userBasket } from 'lib/api/basketApi'

import { REDUCER_ACTIONS } from 'data/reducer'


export const bootstrap = async (update : (data: { type: REDUCER_ACTIONS; payload: any; }) => void) => {

  const products = await getProducts()

  let user, basket
  
  // TODO Promise.all
  try {
    user = await getUser()
    basket = await userBasket()

    console.log(basket)
  } catch (err) {

    user = {
      data: {
        user: null
      }
    }

    basket = {
      data: null
    }
  }
  

  update({
    type: REDUCER_ACTIONS.INIT,
    payload: {
      products: products.data,
      user: user.data.user,
      basket: basket.data ? basket.data : null
    }
  })
}