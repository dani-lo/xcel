import React from 'react'
import styled from 'styled-components'

export enum NotificationType {
  'ERROR',
  'SUCCESS',
  'WARNING',
  'NONE'
}

export interface AppNotification {
  msg: string | null;
  ntype: NotificationType;
  donotify: boolean;
}

const nBorderColor = (props: { ntype: NotificationType }) => {
  return props.ntype === NotificationType.ERROR ?  'red' : 
    props.ntype === NotificationType.WARNING ? 'yellow' : 
    'green'
}

const StyledNotification = styled.div<{ ntype: NotificationType }>`
  border: 2px solid ${ props => nBorderColor(props) };
  position: fixed;
  z-index: var(--z-3);
  background: var(--white);
  right: 1em;
  top: 1em;
`

export const Notify = ({ notification }: { notification : AppNotification | null } ) => {
  
  if (notification && notification.donotify) {
    return <StyledNotification ntype={ notification.ntype } className="padding">
      <p>{ notification.msg }</p>
    </StyledNotification>
  }
  
  return null
}