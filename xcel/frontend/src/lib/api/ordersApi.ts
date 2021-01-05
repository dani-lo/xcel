import axios from 'axios'

import { Product } from '../collections/product'

import { getCSRFToken } from '../util/token'

export const placeOrder = (p : Product, quantity: number) => {

  const csrftoken = getCSRFToken()
  const data = { 
    unit_price: 10.99,
    product: p.id,
    instructions: '123 in in struct' ,
    quantity
  }
  const config = { headers: {'X-CSRFToken': csrftoken }}
  console.log(data)
  return axios.post('/api/orders/', data, config)
}