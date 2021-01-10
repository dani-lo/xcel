import { getUser } from '../lib/api/userAPi'
import { getProducts } from '../lib/api/productsApi'

import { REDUCER_ACTIONS } from '../data/reducer'

export const bootstrap = async (update : (data: { type: REDUCER_ACTIONS; payload: any; }) => void) => {

  // TODO promise.all
  const products = await getProducts()
  const user = await getUser()

  update({
    type: REDUCER_ACTIONS.INIT,
    payload: {
      products: products.data,
      user: user.data.user
    }
  })
}