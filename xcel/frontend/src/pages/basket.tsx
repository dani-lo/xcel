import React, { useState } from 'react';

import { useXcelContext } from 'data/provider'

import { OrdersList } from 'components/orders/ordersList'
import { AppModal } from 'components/widget/modal'

import { XButton, XPageTitle, XPayButton, XScroller, XSection, XViewAccount, XContentMain } from 'styles/styled'

import { PaypalResponse } from 'lib/collections/basket'
import { localBasketCheckout } from 'lib/api/basketApi'
import { getLocalOrders, getLocalOrdersTotal } from 'lib/util/localOrders';
import { getLocalUser } from 'lib/util/localUser';
import { UserAccount } from 'components/user/account';

import { Account } from 'lib/collections/account'

export const BasketPage = () => {
  
  const [payment, setPayment] = useState('')
  const [err, setErr] = useState('')
  const [modal, setModal] = useState(false)

  // const { appstate } = useXcelContext()

  const orders = getLocalOrders()
  const userData = getLocalUser()

  console.log(userData)

  const total = getLocalOrdersTotal()

  if (orders && orders.length) {
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
          err !== '' ? <span className="error">{ err }</span>  : null
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
          <OrdersList orders={ orders } /> 
        </XSection>
        <XSection>
        <h3>Shipment Detail</h3>
        <UserAccount />
        {
          !userData?.account ?
          <p className="txt-small warning">Please add your account data to be able to checkout</p> :
          null
        }
        </XSection>
        <XSection className="flex-row">
          <h3>Total &pound;{ total }</h3> 
          <XButton
            size="small"
            onClick={ async () => {

              setModal(true)

              if (userData?.account) {
                
                const paypalResponse  = await localBasketCheckout(userData.account, orders, total)
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
              }
              
              
            }}
            disabled={ !userData?.account }
          >checkout with paypal</XButton> 
        </XSection>
      </XScroller> 
    </XContentMain>
  } 


  return <XContentMain><XSection><p>You have nothing in your basket</p></XSection></XContentMain>
}