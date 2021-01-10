import React from 'react';
import { Link } from 'react-router-dom'

import { useXcelContext } from '../../data/provider'

export const User = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <>
      <ul>
        <li><Link to="/account"><span className="material-icons">account_circle</span></Link></li>
        <li><Link to="/basket"><span className="material-icons">shopping_basket</span></Link></li>
      </ul>
    </>
  }

  return null
}