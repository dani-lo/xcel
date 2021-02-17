import React, { useEffect, useState } from 'react';

import { useXcelContext } from 'data/provider'

import { OrdersList } from 'components/orders/ordersList'
import { AppModal } from 'components/widget/modal'

import { XButton, XPageTitle, XPayButton, XScroller, XSection } from 'styles/styled'

import { PaypalResponse } from 'lib/collections/basket'
import { basketCheckout } from 'lib/api/basketApi'

export const BasketPage = () => {
  
  const [payment, setPayment] = useState('')
  const [modal, setModal] = useState(false)

  const { appstate } = useXcelContext()

  const basket = appstate.basket

  console.log(appstate)

  if (basket) {
    return  <>
      {
        modal ? <AppModal 
        closeModal={ () => {
          setModal(false)
          setPayment('')
        }}
      >
        <p className="margin-bottom margin-top">By clicking on the paypal checkout you will be taken to your paypal checkin page</p>
       <p>{ 
        payment !== '' ? <XPayButton href={ payment }>place your order</XPayButton> : <span>Please wait</span> 
       }</p>
      </AppModal> : null
      }
      <XPageTitle className="txt-jumbo margin-top margin-bottom padding-top padding-bottom padding cap">your orders</XPageTitle>
      <XSection highlight className="txt-medium margin-dub-top margin-dub-bottom padding">
        <p className="txt-small">For yus to be baleto deliver your orders we will need your full address details</p>
        <p className="txt-small">When you are happy with your orders plese make sure you have already added your address details in your account, then proceed to a secure checkout via Paypal</p>
      </XSection>
      <XScroller>
        <XSection>
          <OrdersList orders={ basket.orders } /> 
        </XSection>
        <XSection className="flex-row">
          <h3 className="txt-medium">Total &pound;{ basket.total }</h3> 
          <XButton
            size="small"
            onClick={ async () => {

              setModal(true)

              const paypalResponse  = await basketCheckout(basket)
              const responseData : PaypalResponse = paypalResponse.data
              const approveLink = responseData.links.find(l => l.rel === "approve")
              
              if (approveLink) {
                setPayment(approveLink.href)
              }
            }}
          >checkout with paypal</XButton> 
        </XSection>
      </XScroller> 
    </>
  } 


  return <p>You have nothing in your basket</p>
}