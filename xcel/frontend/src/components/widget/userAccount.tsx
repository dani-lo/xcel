import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useXcelContext } from '../../data/provider'

const StyledUserWidget = styled.ul`
  list-style: none;

  li {
    display: inline-block;
  }
`

export const UserAccountWidget = () => {
  
  const { appstate } = useXcelContext()

  const userData = appstate.user

  if (userData !== null) {
    return <>
      <StyledUserWidget>
        <li><Link to="/account"><span className="material-icons">account_circle</span></Link></li>
        <li><Link to="/basket"><span className="material-icons">shopping_basket</span></Link></li>
      </StyledUserWidget>
    </>
  } else {
    return <>
      <StyledUserWidget>
        <li><Link to="/register"><span className="material-icons">account_circle</span></Link></li>
      </StyledUserWidget>
    </>
  }
}