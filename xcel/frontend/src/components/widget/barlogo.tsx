import React from 'react'
import styled from 'styled-components'

const StyledBarLogo = styled.div`

  img {
    width: 140px;
  }
`

export const BarLogo = () => {
  return <StyledBarLogo>
    <img style={{ width: '140px' }} src="/media/company/xcel-logo-txt.png" />
  </StyledBarLogo>
}