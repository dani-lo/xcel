import React, { useEffect, useState } from 'react';

import { useXcelContext } from '../data/provider'

import { OrdersList } from '../components/orders/ordersList'
import { XButton } from '../styles/styled';

import { PaypalResponse } from '../lib/collections/basket'
import { basketCheckout } from '../lib/api/basketApi'

export const BasketPage = () => {
  
  const [payment, setPayment] = useState('')

  const { appstate } = useXcelContext()

  const basket = appstate.basket

  if (basket !== null && payment === '') {
    return <XButton
      size="small"
      onClick={ async () => {

        const paypalResponse  = await basketCheckout(basket)
        const responseData : PaypalResponse = paypalResponse.data
        const approveLink = responseData.links.find(l => l.rel === "approve")
        
        if (approveLink) {
          setPayment(approveLink.href)
        }
      }}
    >checkout with paypal</XButton> 
  } 

  if (payment !== '') {
    return <a href={ payment }>checkout with paypal</a> 
  }

  return <p>You have nothing to pay</p>
  
  // if (userData !== null) {
  //   return <>
  //    <h1 className="txt-large margin padding-dub txt-center">Your basket</h1>
  //    <OrdersList orders={ userData.orders} />
  //   </>
  // }

  // return null
}