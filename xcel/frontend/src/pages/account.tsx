import React from 'react';

import { addAccount, logout } from '../lib/api/userAPi'

import { useXcelContext } from '../data/provider'
import { XButton } from '../styles/styled';
import { Account } from '../lib/collections/account';

export const AccountPage = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <div>
      <h1 className="txt-large margin padding-dub txt-center">Account</h1>
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
    </div>  
  }

  return null
}