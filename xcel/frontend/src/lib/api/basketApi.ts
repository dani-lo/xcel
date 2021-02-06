import axios from 'axios'
import { Basket } from 'lib/collections/basket'


import { getCSRFToken } from '../util/token'

export const BASKET_STATUS = {
  OPEN: 'OPEN'
}

export const createBasket = () => {
  const csrftoken = getCSRFToken()
  const data = {}
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.post('/api/basket/', data, config)
}

export const userBasket = () => {
  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.get('/api/basket/', config)
}

export const doPay = () => {
  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}

  return axios.post('/api/setup-payment/', config)
}

export const basketCheckout = (basket : Basket) => {
  const csrftoken = getCSRFToken()
  const config = { headers: {'X-CSRFToken': csrftoken }}



  return axios.put(`/api/checkout/${ basket.id }`, {}, config)
}


export const setupPayment = () => {}