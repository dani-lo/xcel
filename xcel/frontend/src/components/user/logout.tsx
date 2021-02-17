import React from 'react';

import { logout } from 'lib/api/userAPi'

import { useXcelContext } from 'data/provider'
import { REDUCER_ACTIONS } from 'data/reducer'

import { XButton } from 'styles/styled'

export const UserLogout = () => {
  
  const { appstate, update } = useXcelContext()

  const userData = appstate.user
  
  return userData ? <XButton
        size="small"
        onClick={async () => {
          try {
            await logout()
            
            update({ type: REDUCER_ACTIONS.LOGOUT_USER })
          } catch (err) {

          }
        }}
      >logout</XButton>: null
}