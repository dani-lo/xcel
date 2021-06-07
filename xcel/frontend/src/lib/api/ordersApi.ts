import axios from 'axios'

import { Basket } from 'lib/collections/basket'
import { Order } from 'lib/collections/order'
import { Product } from 'lib/collections/product'

import { getCSRFToken } from 'lib/util/token'

export const ORDER_STATUS = {
  DELETED: 'DELETED'
}

export const placeOrder = (p : Product, b: Basket, quantity: number) => {

  const csrftoken = getCSRFToken()
  const data = { 
    unit_price: p.price,
    product: p.id,
    basket: b.id,
    quantity
  }
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.post('/api/orders/', data, config)
}

export const deleteOrder = (order : Order) => {

  const csrftoken = getCSRFToken()
  const data = { 
    deleted: new Date().getTime()
  }
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.put(`/api/orders/${ order.id }/`, data, config)
}

export const allRemoteOrders = (xcelid : string) => {

  return axios.get(`/api/l-orders/${ xcelid }`)
}