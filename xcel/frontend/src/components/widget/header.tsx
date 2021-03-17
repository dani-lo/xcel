import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { useXcelContext } from 'data/provider'

import { useWindowEvent } from 'hooks/useWindowEvent'

const StyledHeader = styled.nav`
  position: fixed;
  width: 100%;
  background: var(--bg);
  animation: top 2s ease-in;

  .header-content {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pad-3) 0;
    margin: 0 auto;
    width: 800px;
  }

  @media only screen and (max-width: 800px) {
    .header-content {
      padding: var(--pad-3);
      margin: 0 auto;
      width: auto;
    }
    
  }

  &.sticky {
    top: 0;
  }

  &.sticky-hide {
    top: -50px;
  }

  &.non-sticky {
    position: absolute;
    top: 0;
  }

  .orders-indicator {
    position: relative;
    left: -10px;
    top: -4px;
    color: var(--txt-main);
    font-size: 12px;
  }
  ul {
    text-align: right;
    li {
      display: inline-block;
      text-transform: lowercase;

      a {
        text-decoration: none;
        color: var(--txt-main);
        font-weight: bold;
        padding: var(--pad-1) var(--pad-3);

        i {
          font-size: 14px;
        }

        &.textual {
          border: 1px solid var(--bg);
          padding: var(--pad-1) var(--pad-4);
          border-radius: 4px;
        }
      }

      &.active {
        a {
          background: var(--black);
          color: var(--white);
          border: none;
        }
        .orders-indicator {
          color: var(--white);
        }
      }

      &.link-light {
        a {
          font-weight: normal;
        }
      }
    }
    &.user-menu.loggedin {
      li:first-child {
        border-right: 1px solid var(--border);
      }
    }
  }
`

const StyledPayoff = styled.div`
  background-image: url(/media/screen.png);
  height: 300px;
  background-size: cover;

  @media only screen and (max-width: 800px) {
    height: 200px;
  }

`

export const AppHeader = () => {

  const { appstate } = useXcelContext()
  const [headerclass, setHeaderclass] = useState('non-sticky')

  const userData = appstate.user

  const ordersNum = appstate.basket?.orders.length || 0
  const location = useLocation()

  useWindowEvent('scroll', () => {
    if (window.pageYOffset > 100 && headerclass === 'non-sticky') {
      setHeaderclass('sticky-hide')

      setTimeout(() => {
        setHeaderclass('sticky')
      }, 100)
    } else if (window.pageYOffset < 20 && headerclass !== 'non-sticky') {
      //setHeaderclass('sticky-hide')

      //setTimeout(() => {
      setHeaderclass('non-sticky')
      //}, 100)
    }
  })

  return <>
    <StyledHeader className={ headerclass }>
      <div className="header-content">
        <Link to="/">
          <img style={{ width: '70px' }} src="/media/company/xcel-logo-txt.png" />
        </Link>
        <ul className="main-menu">
          <li className={ ` ${ location.pathname === '/' ? 'active' : '' }` }>
            <Link to="/">Home</Link>
          </li>
          <li className={ `${ location.pathname === '/shop' ? 'active' : '' }` }>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        { userData !== null ? 
            <ul className="user-menu loggedin">
              <li className={ `${ location.pathname === '/account' ? 'active' : '' }` }>
                <Link to="/account"><i className="fas fa-user"></i></Link>
              </li>
              <li className={ `${ location.pathname === '/basket' ? 'active' : '' }` }>
                <Link to="/basket" ><span><i className="fas fa-shopping-cart"></i></span></Link>
                { ordersNum ? 
                  <span className="orders-indicator">{ ordersNum }</span>
                  : null 
                }
              </li>
            </ul>
        :
            <ul className="user-menu">
              <li><Link to="/account"><i className="fas fa-user"></i></Link></li>
            </ul>
        }
    </div>
    </StyledHeader>
    <StyledPayoff>
    </StyledPayoff>
  </>
} 