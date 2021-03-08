import React, { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"


import { appReducer, APP_STATUS, initialState } from 'data/reducer'
import { bootstrap } from 'data/bootstrap'
import { useXcelContext } from '../data/provider'

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
    console.log('HJERERE', poid)
    if (poid && poid.length > 1) {
      console.log('GO')
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
    }
  }

  useEffect(() => {
    capture()
  }, [poid])

  const paid = poid && poid != '0' && success === 'paid'
  const failed = poid && poid != '0' && success === 'failed'
  const awaiting = poid && poid != '0' && success === 'init'

  return <XContentMain>
    <XPageTitle className="txt-jumbo margin-top margin-dub-bottom padding-top padding-bottom padding cap">Your Order</XPageTitle>
    <XSection style={{ marginTop: '4em'}}>
      {
        paid ? <>
          <h3 className="txt-medium">Thank you for your order</h3>
          <p className="txt-small margin-top margin-bottom">Your order was successful</p>
        </> : null
      }
      {
        failed ? <>
          <h3 className="txt-medium">There was something wrong with your order</h3>
          <p className="txt-small margin-top margin-bottom">Please get in touch with us</p>
        </> : null
      }
      {
        awaiting ? <>
          <h3 className="txt-medium">&nbsp;</h3>
          <p className="txt-small margin-top margin-bottom">&nbsp;</p>
        </> : null
      }
    </XSection>
      
      
      <XSection style={{ marginTop: '4em'}}>
        <h3 className="txt-medium margin-top margin-bottom">IXcel Nature</h3>
        <ul className="margin-top margin-bottom">
          <li className="padding-half-top padding-half-bottom txt-small">Orders are delivered tipically within 4 or 5 working days to the address you provided</li>
          <li className="padding-half-top padding-half-bottom txt-small">We will always use the address you specified within your account section. Only on e active address is allowed per account</li>
          <li className="padding-half-top padding-half-bottom txt-small">Contact us on 07947 937 915 or at hello@ixcel-nature.co.uk</li>
        </ul>
      </XSection> 
  </XContentMain> 
  

}