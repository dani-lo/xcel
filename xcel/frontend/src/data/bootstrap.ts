import { getUser } from 'lib/api/userAPi'
import { getProducts } from 'lib/api/productsApi'
import { userBasket } from 'lib/api/basketApi'

import { REDUCER_ACTIONS } from 'data/reducer'
import { notifySuccess } from 'data/shortcuts'

export const bootstrap = async (
    update : (data: { type: REDUCER_ACTIONS; payload: any; }) => void, 
    msg ?: string) => {

  const products = await getProducts()

  // let user, basket
  
  // // TODO Promise.all
  // try {
  //   user = await getUser()
  //   basket = await userBasket()

  // } catch (err) {

  //   user = {
  //     data: {
  //       user: null
  //     }
  //   }

  //   basket = {
  //     data: null
  //   }
  // }
    
  // const notification = msg ? [{
  //   msg,
  //   type: NotificationType.SUCCESS,
  //   id: new Date().getTime()
  // }] : []

  update({
    type: REDUCER_ACTIONS.INIT,
    payload: {
      products: products.data,
      // user: user.data.user,
      // basket: basket.data ? basket.data : null
    }
  })

  if (msg) {
    notifySuccess(update, msg)
  }
}