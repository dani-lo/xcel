import React from 'react'

import { UserRegistration } from '../components/user/register'
import { UserLogin } from '../components/user/login'

import { XSection } from '../styles/styled'

export const RegistrationPage = () => {

	return <>
    <XSection>
      <h2 className="txt-medium">Register a new account</h2>
      <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px'}}>To be able to buy our prducts you will need to create an account: this requires entering you r email and a password of your choice. You will be then able to add or edit your account detail, which will be used for shipments</p>
      <UserRegistration />
    </XSection>
    <XSection highlight={ true }>
      <h2 className="txt-medium">Or login with your account</h2>
      <p className="txt-small margin-top margin-bottom" style={{ maxWidth: '400px'}}>Login with your existing username and password</p>
      <UserLogin />
    </XSection>
	</>
	
}


