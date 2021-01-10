import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.nav`
  ul {
    text-align: center;
    li {
      display: inline-block;
      background: var(--highlight);
      border-radius: 0.2rem;
      width: 120px;

      a {
        text-decoration: none;
        color: var(--white);
      }
    }
  }
`

export const AppHeader = () => {
  return <StyledHeader>
    <ul>
      <li className="padding margin-left margin-right">
        <Link to="/">Homer</Link>
      </li>
      <li className="padding margin-left margin-right">
        <Link to="/about">About</Link>
      </li>
      <li className="padding margin-left margin-right">
        <Link to="/shop">Shop</Link>
      </li>
    </ul>
  </StyledHeader>
} 