import React, { useState } from 'react';

import { useXcelContext } from 'data/provider'

import { OrdersList } from 'components/orders/ordersList'
import { AppModal } from 'components/widget/modal'

import { XButton, XPageTitle, XPayButton, XScroller, XSection, XViewAccount, XContentMain } from 'styles/styled'

import { PaypalResponse } from 'lib/collections/basket'
import { basketCheckout } from 'lib/api/basketApi'

export const BasketPage = () => {
  
  const [payment, setPayment] = useState('')
  const [err, setErr] = useState('')
  const [modal, setModal] = useState(false)

  const { appstate } = useXcelContext()

  const userData = appstate.user
  const basket = appstate.basket

  if (basket) {
    return  <XContentMain>
      {
        modal ? <AppModal 
        closeModal={ () => {
          setModal(false)
          setPayment('')
        }}
      >
        <p>By clicking on the paypal checkout you will be taken to your paypal checkin page</p>
        <p>
        { 
          payment !== '' ? <XPayButton size="small"><a href={ payment }>place your order</a></XPayButton> : null 
        }
        {
          err !== '' ? <span>{ err }</span>  : null
        }
        {
          err === '' && payment === '' ? <span>Please wait</span> : null
        }
        </p>
      </AppModal> : null
      }
      <XPageTitle className="cap">your orders</XPageTitle>
      <XSection highlight>
        <p>For yus to be baleto deliver your orders we will need your full address details</p>
        <p>When you are happy with your orders plese make sure you have already added your address details in your account, then proceed to a secure checkout via Paypal</p>
      </XSection>
      <XScroller>
        <XSection>
          <OrdersList orders={ basket.orders } /> 
        </XSection>
        <XSection>
        <h3>Shipment Detail</h3>
        { userData?.account ? 
          <XViewAccount>
            <li className="padding-half-bottom padding-half-top"><span>first name</span>{ userData.account.firstname }</li>
            <li className="padding-half-bottom padding-half-top"><span>last name</span>{ userData.account.lastname }</li>
            <li className="padding-half-bottom padding-half-top"><span>address line 1</span>{ userData.account.address_line_1 }</li>
            <li className="padding-half-bottom padding-half-top"><span>address line 2</span>{ userData.account.address_line_2 }</li>
            <li className="padding-half-bottom padding-half-top"><span>postcode</span>{ userData.account.postcode }</li>
            <li className="padding-half-bottom padding-half-top"><span>country</span>{ userData.account.city }</li>
        </XViewAccount> : null
        }
        </XSection>
        <XSection className="flex-row">
          <h3>Total &pound;{ basket.total }</h3> 
          <XButton
            size="small"
            onClick={ async () => {

              setModal(true)

              const paypalResponse  = await basketCheckout(basket)
              const responseData : PaypalResponse = paypalResponse.data

              if (responseData.error) {
                setErr(responseData.error)
              } else {
                const approveLink = responseData.links.find(l => l.rel === "approve")
              
                if (approveLink) {
                  setPayment(approveLink.href)
                } else {
                  setErr('something went wrong')
                }
              }
              
            }}
          >checkout with paypal</XButton> 
        </XSection>
      </XScroller> 
    </XContentMain>
  } 


  return <p>You have nothing in your basket</p>
}