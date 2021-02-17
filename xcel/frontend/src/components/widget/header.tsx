import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useXcelContext } from 'data/provider'

const StyledHeader = styled.nav`
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--pad-2) 5em;
  margin: 0 auto;

  ul {
    text-align: right;
    li {
      display: inline-block;
      text-transform: lowercase;

      a {
        text-decoration: none;
        color: var(--txt-main);
        font-weight: bold;
        font-size: 0.8em;
      }

      &.link-light {
        a {
          font-weight: normal;
        }
      }
    }
  }
  ul.user-menu {
    li {
      padding-left: var(--pad-2);
      position: relative;

      &:first-child {
        padding-right: var(--pad-2);
        border-right: 1px solid var(--border);
      }

      span.orders-indicator {
        position: absolute;
        right: -10px;
        top: -3px;
        font-size: 11px;
        font-weight: bold;
      }
    }
  }
`

const StyledPayoff = styled.div`
  height: 24px;
  background: var(--black);
  border-bottom: 1px solid var(--border);
`

export const AppHeader = () => {

  const { appstate } = useXcelContext()
  const userData = appstate.user

  const ordersNum = appstate.basket?.orders.length || 0

  return <>
    <StyledHeader>
      <Link to="/"><img style={{ width: '70px' }} src="/media/company/xcel-logo-txt.png" /></Link>
      <ul className="main-menu">
        <li className="margin-left margin-right">
          <Link to="/shop">Shop</Link>
        </li>
      </ul>

    { userData !== null ? 
        <ul className="user-menu">
          <li><Link to="/account"><i className="fas fa-user"></i></Link></li>
          <li>
            <Link to="/basket"><span><i className="fas fa-shopping-cart"></i></span></Link>
            { ordersNum ? 
              <span className="orders-indicator">{ ordersNum }</span>
              : null 
            }
          </li>
        </ul>
    :
        <ul className="user-menu padding-dub-left">
          <li className="link-light"><Link to="/account"><span>login or create account</span></Link></li>
        </ul>
    }
    </StyledHeader>
    <StyledPayoff />
  </>
} 