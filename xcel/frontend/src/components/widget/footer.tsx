import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { useXcelContext } from 'data/provider'

const StyledAppFooter = styled.div`
  background: var(--black);
  padding: 5em;
  width: 80%;
  margin: auto;
  align-items: baseline;

  @media only screen and (max-width: 800px) {
    padding: 2em;

    > div {
      margin-top: var(--pad-4);
    }
  }

  li, p, h3, a {
    color: var(--white);
  }
  h3 {
    border-bottom: 1px dotted var(--white);
  }

  > div {
    flex: 1;

  }
`

export const AppFooter = () => {

  const { appstate } = useXcelContext()

  const userData = appstate.user

  return <StyledAppFooter className="flex-row block-responsive-small">
    <div className="padding-left padding-right">
      <h3>Pages</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/account">Account</Link></li>
        {
          userData ? <li><Link to="/basket">Basket</Link></li> : null
        }
      </ul>
    </div>
    <div className="padding-left padding-right">
        <h3>Disclaimer</h3>
        <p>Lorem ipso dolo r sit amet  r sit amet r sit amet r sit amet sdfsf dsf sdf sdf sdfsetiam blah blah</p>
        <p>Eyiam non adipiscit comusque non facit: you can be ure bla is a bla bla hotel alfa et etiam papa</p>
        <p>Lorem ipso dolor sit amet etiam blah blah</p>
    </div>
    <div className="padding-left padding-right">
        <h3>Language</h3>
        <ul>
          <li><a href="#">English</a></li>
          <li><a href="#">Italiano</a></li>
        </ul>
    </div>
  </StyledAppFooter>  
}