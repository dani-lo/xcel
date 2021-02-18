import React, { useEffect, useState } from 'react';

import { useXcelContext } from 'data/provider'

import { OrdersList } from 'components/orders/ordersList'
import { AppModal } from 'components/widget/modal'

import { XButton, XPageTitle, XPayButton, XScroller, XSection, XViewAccount } from 'styles/styled'

import { PaypalResponse } from 'lib/collections/basket'
import { basketCheckout } from 'lib/api/basketApi'

export const BasketPage = () => {
  
  const [payment, setPayment] = useState('')
  const [modal, setModal] = useState(false)

  const { appstate } = useXcelContext()

  const userData = appstate.user
  const basket = appstate.basket

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
        payment !== '' ? <XPayButton><a href={ payment }>place your order</a></XPayButton> : <span>Please wait</span> 
       }</p>
      </AppModal> : null
      }
      <XPageTitle className="txt-jumbo margin-top margin-bottom padding-top padding-bottom padding cap">your orders</XPageTitle>
      <XSection highlight className="txt-medium margin-dub-top margin-dub-bottom padding">
        <p className="txt-small margin-bottom">For yus to be baleto deliver your orders we will need your full address details</p>
        <p className="txt-small margin-bottom">When you are happy with your orders plese make sure you have already added your address details in your account, then proceed to a secure checkout via Paypal</p>
      </XSection>
      <XScroller>
        <XSection>
          <OrdersList orders={ basket.orders } /> 
        </XSection>
        <XSection>
        <h3 className="text-medium margin-dub-top margin-dub-bottom">Shipment Detail</h3>
        <XViewAccount className="margin-bottom">
          <li className="txt-small padding-half-bottom padding-half-top"><span>first name</span>{ userData.account.firstname }</li>
          <li className="txt-small padding-half-bottom padding-half-top"><span>last name</span>{ userData.account.lastname }</li>
          <li className="txt-small padding-half-bottom padding-half-top"><span>address line 1</span>{ userData.account.address_line_1 }</li>
          <li className="txt-small padding-half-bottom padding-half-top"><span>address line 2</span>{ userData.account.address_line_2 }</li>
          <li className="txt-small padding-half-bottom padding-half-top"><span>postcode</span>{ userData.account.postcode }</li>
          <li className="txt-small padding-half-bottom padding-half-top"><span>country</span>{ userData.account.country }</li>
        </XViewAccount>
        </XSection>
        <XSection className="flex-row">
          <h3 className="txt-medium margin-dub-top">Total &pound;{ basket.total }</h3> 
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