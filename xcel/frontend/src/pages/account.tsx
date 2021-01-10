import React from 'react';

import { useXcelContext } from '../data/provider'

export const AccountPage = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <h1 className="txt-large margin padding-dub txt-center">Account</h1>
  }

  return null
}