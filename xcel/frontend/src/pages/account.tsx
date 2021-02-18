import React from 'react';

import { useXcelContext } from '../data/provider'
import { APP_STATUS } from '../data/reducer'

import { UserRegistration } from '../components/user/register'
import { UserLogin } from '../components/user/login'
import { UserLogout } from '../components/user/logout'
import { UserAccount } from '../components/user/account'

import { XSection, XPageTitle } from '../styles/styled'

export const AccountPage = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user
  const appStatus = appstate.status

  if (appStatus === APP_STATUS.LOGGED_IN && userData !== null) {
    return <>
      <XPageTitle className="txt-jumbo margin-top margin-dub-bottom padding-top padding-bottom padding cap">Your Account</XPageTitle>
      <XSection style={{ marginTop: '4em'}}>
        <h3 className="txt-medium">You are logged in as</h3>
        <p className="txt-small margin-top margin-bottom">{ userData.email }</p>
        <UserLogout / >
        </XSection>
        <XSection style={{ marginTop: '4em'}}>
        <h3 className="txt-medium">Your account data</h3>
        <p className="txt-small margin-top margin-bottom">We will need your account details for purchases on this site</p>
        <UserAccount />
      </XSection> 
    </> 
  } 

  return <>
    <XPageTitle className="txt-jumbo margin-top margin-bottom padding-top padding-bottom padding cap">Your Account</XPageTitle>
    <XSection style={{ marginTop: '4em'}}> 
      <h2 className="txt-medium">Register a new account</h2>
      <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px'}}>To be able to buy our prducts you will need to create an account: this requires entering you r email and a password of your choice. You will be then able to add or edit your account detail, which will be used for shipments</p>
      <UserRegistration />
    </XSection>
    <XSection style={{ marginTop: '4em'}}>
      <h2 className="txt-medium">Or login with your account</h2>
      <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px'}}>Login with your existing username and password</p>
      <UserLogin />
    </XSection>
  </>
  
}