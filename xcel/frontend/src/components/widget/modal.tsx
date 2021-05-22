import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom' 
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
    border: 2px solid var(--black);

    @media only screen and (max-width: 800px) {
      width: 90%;
    }
    
  }

`

interface Props {
  closeModal : () => void;
  children: React.ReactNode;

}

const Portal = ({ children } : { children: any }) => {
  const [container] = useState(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}

console.log('M')

export const AppModal = (props : Props) => {

  return <Portal>
    <StyledModal>
      <div className="modal-bg"></div>
      <XSection className="modal-body">
        <div className="modal-header padding">
          <XButton size="small" onClick={ props.closeModal }>
            close
            </XButton>
        </div>
        <div className="padding-dub">
          { 
            props.children
          }
        </div>
      </XSection>
    </StyledModal>
  </Portal>

}