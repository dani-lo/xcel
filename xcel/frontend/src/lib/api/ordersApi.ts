import axios from 'axios'

import { Order } from 'lib/collections/order'
import { Product } from '../collections/product'

import { getCSRFToken } from '../util/token'

export const ORDER_STATUS = {
  DELETED: 'DELETED'
}

export const placeOrder = (p : Product, quantity: number) => {

  const csrftoken = getCSRFToken()
  const data = { 
    unit_price: 10.99,
    product: p.id,
    instructions: '123 in in struct' ,
    quantity
  }
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.post('/api/orders/', data, config)
}

export const deleteOrder = (order : Order) => {

  const csrftoken = getCSRFToken()
  const data = { 
    status: ORDER_STATUS.DELETED
  }
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.patch(`/api/orders/${ order.id }/`, data, config)
}