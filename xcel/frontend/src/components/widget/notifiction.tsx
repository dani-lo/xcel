import React from 'react'
import styled from 'styled-components'

import { useTransition } from 'hooks/useTransition'

export enum NotificationType {
  'ERROR',
  'SUCCESS',
  'WARNING',
  'NONE'
}

export interface AppNotification {
  msg: string | null;
  type: NotificationType;
  id: number;
}

const nBackground = (props: { type: NotificationType }) => {
  return props.type === NotificationType.ERROR ?  'red' : 
    props.type === NotificationType.WARNING ? 'yellow' : 
    'green'
}

const StyledNotification = styled.div<{ type: NotificationType }>`
  background: ${ props => nBackground(props) };
  border: 2px solid var(--white);
  color: var(--white);

  p {
    font-weight: bold;
  }
`

const StyledNotificationContainer = styled.div`
  position: fixed;
  z-index: var(--z-3);
  right: 1em;
  top: 1em;
`

export const Notify = ({ notifications }: { notifications : AppNotification[] } ) => {
  
  if (notifications && notifications.length) {

    const cname = useTransition('in')

    return <StyledNotificationContainer> 
    {
      notifications.map((notification, i) => {
        return <StyledNotification 
          key={ `notification-${ i }` } 
          type={ notification.type } 
          className={ `${ cname }` }
        >
          <p className="txt-medium">{ notification.msg }</p>
        </StyledNotification>
      })
    }
    </StyledNotificationContainer>
    
  }
  
  return null
}