import React from 'react';

import { useXcelContext } from '../data/provider'

import { OrdersList } from '../components/orders/ordersList'


export const BasketPage = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <>
     <h1 className="txt-large margin padding-dub txt-center">Your basket</h1>
     <OrdersList orders={ userData.orders} />
    </>
  }

  return null
}