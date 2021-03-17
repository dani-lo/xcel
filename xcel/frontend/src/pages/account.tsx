import React from 'react'
import { useParams } from "react-router-dom"

import { useXcelContext } from '../data/provider'
import { APP_STATUS } from '../data/reducer'

import { UserRegistration } from '../components/user/register'
import { UserLogin } from '../components/user/login'
import { UserLogout } from '../components/user/logout'
import { UserAccount } from '../components/user/account'

import { XSection, XPageTitle, XContentMain } from '../styles/styled'

export const AccountPage = () => {
  
  let params = useParams()

  console.log(params)

  const { appstate } = useXcelContext()

  const userData = appstate.user
  const appStatus = appstate.status

  if (appStatus === APP_STATUS.LOGGED_IN && userData !== null) {
    return <XContentMain>
      <XPageTitle className="cap">Your Account</XPageTitle>
      <XSection>
        <h3>You are logged in as</h3>
        <p>{ userData.email }</p>
        <UserLogout / >
        </XSection>
        <XSection>
          <h3>Your account data</h3>
          <p>We will need your account details for purchases on this site</p>
        <UserAccount />
      </XSection> 
    </XContentMain> 
  } 

  return <XContentMain>
    <XPageTitle className="cap">Your Account</XPageTitle>
    <XSection> 
      <h2>Register a new account</h2>
      <p style={{ maxWidth: '400px'}}>To be able to buy our prducts you will need to create an account: this requires entering you r email and a password of your choice. You will be then able to add or edit your account detail, which will be used for shipments</p>
      <UserRegistration />
    </XSection>
    <XSection>
      <h2>Or login with your account</h2>
      <p style={{ maxWidth: '400px'}}>Login with your existing username and password</p>
      <UserLogin />
    </XSection>
  </XContentMain>
  
}