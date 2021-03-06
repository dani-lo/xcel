import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"


import { basketCaptureConfirm } from 'lib/api/basketApi'

import { XSection, XPageTitle, XContentMain } from '../styles/styled'


interface Params {
  poid ?: string;
}

export const PaymentConfirmPage = () => {
  
  const params = useParams<Params>() 

  const poid = params.poid

  const [success, setSuccess] = useState('init')

  const capture = async () => {
    if (poid && poid.length > 1) {
      try {
        const result : any = await basketCaptureConfirm(poid)

        if (result && result.data && result.data.poid === poid) {
          setSuccess('paid')
        } else {
          setSuccess('failed')
        }
      } catch (err) {
        setSuccess('failed')
      }
    } else if (poid && poid.length === 1) {
      setSuccess('failed')
    }
  }

  useEffect(() => {
    capture()
  }, [poid])

  const paid = poid && success === 'paid'
  const failed = poid &&  success === 'failed'
  const awaiting = success === 'init'

  return <XContentMain>
    <XPageTitle className="cap">Your Order</XPageTitle>
    <XSection style={{ marginTop: '4em'}}>
      {
        paid ? <>
          <h3>Thank you for your order</h3>
          <p>Your order was successful</p>
        </> : null
      }
      {
        failed ? <>
          <h3>There was something wrong with your order</h3>
          <p>Please get in touch with us</p>
        </> : null
      }
      {
        awaiting ? <>
          <h3>&nbsp;</h3>
          <p>&nbsp;</p>
        </> : null
      }
    </XSection>
      
      
      <XSection style={{ marginTop: '4em'}}>
        <h3>IXcel Nature</h3>
        <ul>
          <li>Orders are delivered tipically within 4 or 5 working days to the address you provided</li>
          <li>We will always use the address you specified within your account section. Only on e active address is allowed per account</li>
          <li>Contact us on 07947 937 915 or at hello@ixcel-nature.co.uk</li>
        </ul>
      </XSection> 
  </XContentMain> 
  

}