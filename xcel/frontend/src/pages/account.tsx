import React from 'react';

import { addAccount, logout } from '../lib/api/userAPi'
import { Account } from '../lib/collections/account'

import { useXcelContext } from '../data/provider'

import { UserRegistration } from '../components/user/register'
import { UserLogin } from '../components/user/login'

import { XSection, XButton } from '../styles/styled'

export const AccountPage = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <XSection>
      <p>You are logged in as</p>
      <ul>
        <li>{ userData.email }</li>
      </ul>
      <XButton
        size="small"
        onClick={() => {
          logout()
        }}
      >logout</XButton>

      <XButton
        size="small"
        onClick={() => {
          const accData = {
            firstname : 'dani',
            lastname: 'longaroni',
            address_line_1: 'da building',
            address_line_2: '14 how str',
            country: 'UK',
            postcode: 'N229PP'
          } 


          addAccount(new Account(accData))
        }}
      >add account data</XButton>
    </XSection>  
  } else {
    return <>
      <XSection>
        <h2 className="txt-medium">Register a new account</h2>
        <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px;'}}>To be able to buy our prducts you will need to create an account: this requires entering you r email and a password of your choice. You will be then able to add or edit your account detail, which will be used for shipments</p>
        <UserRegistration />
      </XSection>
      <XSection highlight={ true }>
        <h2 className="txt-medium">Or login with your account</h2>
        <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px;'}}>Login with your existing username and password</p>
        <UserLogin />
      </XSection>
    </>
  }


  return null
}