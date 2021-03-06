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

export const placeLocalOrder  = (p : Product, b: Basket, quantity: number) => {

  let orders : Order[] = []

  const savedOrders = localStorage.getItem('orders')
  const existingOrders = savedOrders ? JSON.parse(savedOrders) : [] as Order[]

  const existingProductOrder : Order = existingOrders.find((order : Order) => order.product_id === p.id)

  if (existingProductOrder) {
    orders = existingOrders.reduce((acc : Order[], curr: Order) : Order[] => {
      if (curr.product_id == p.id) {
        acc.push({
          ...curr,
          quantity: curr.quantity + quantity
        })
      } else {
        acc.push(curr)
      }

      return acc
    }, [])
  } else {
    orders = [
      ...existingOrders,
      { 
        unit_price: p.price,
        product: p.id,
        basket: b.id,
        quantity
      }
    ]
  }

  localStorage.setItem('orders', JSON.stringify(orders))
}