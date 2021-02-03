import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useXcelContext } from '../../data/provider'

const StyledHeader = styled.nav`
  background: var(--white);
  /* border-bottom: 1px solid var(--border); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--pad-2) 0;
  max-width: 500px;  
  margin: 0 auto;

  ul {
    text-align: right;
    li {
      display: inline-block;
      text-transform: lowercase;

      a {
        text-decoration: none;
        color: var(--txt-main);
      }
    }
  }
  ul.user-menu {
    li {
      padding-left: var(--pad-2);
      &:first-child {
        padding-right: var(--pad-2);
        border-right: 1px solid var(--border);
      }
    }
  }
  /* ul.main-menu {
    li {
      background: var(--highlight);
      color: var(--white);
      padding: 3px 12px 5px;

      a {
        color: var(--white);
        text-decoration: none;
      }
    }
  } */
`

const StyledPayoff = styled.div`
  height: 24px;
  background: var(--highlight-light-bright);
  border-bottom: 1px solid var(--border);
`

export const AppHeader = () => {

  const { appstate } = useXcelContext()
  const userData = appstate.user

  return <>
    <StyledHeader>
      <Link to="/"><img style={{ width: '70px' }} src="/media/company/xcel-logo-txt.png" /></Link>
      <ul className="main-menu">
        <li className="margin-left margin-right">
          <Link to="/about">About</Link>
        </li>
        <li className="margin-left margin-right">
          <Link to="/shop">Shop</Link>
        </li>
      </ul>

    { userData !== null ? 
        <ul className="user-menu">
          <li><Link to="/account"><i className="fas fa-user"></i></Link></li>
          <li><Link to="/basket"><span><i className="fas fa-shopping-cart"></i></span></Link></li>
        </ul>
    :
        <ul className="user-menu">
          <li><Link to="/login"><span>login</span></Link></li>
          <li><Link to="/register"><span>create account</span></Link></li>
        </ul>
    }
    </StyledHeader>
    <StyledPayoff />
  </>
} 