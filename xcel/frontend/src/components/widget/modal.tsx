import React from 'react'
import styled from 'styled-components'
import { XButton, XSection } from 'styles/styled'

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-4);

  div.modal-bg {
    background: var(--bg);
    opacity: 0.75;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  div.modal-header {
    position: relative;
    z-index: var(--z-1);
    text-align: right;
    border-bottom: 1px solid var(--border);
  }

  div.modal-body {
    position: relative;
    z-index: var(--z-1);
    width: 500px;
    margin: 2em auto;
  }
`

interface Props {
  closeModal : () => void;
  children: React.ReactNode;

}

export const AppModal = (props : Props) => {

  return <StyledModal>
    <div className="modal-bg"></div>
    
    <XSection className="modal-body">
      <div className="modal-header padding-bottom">
        <XButton size="small" onClick={ props.closeModal }>
          close
          </XButton>
      </div>
      { 
        props.children
      }
    </XSection>
  </StyledModal>

}