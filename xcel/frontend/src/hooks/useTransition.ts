import { Dispatch, useEffect, useState } from 'react' 

const TRANSITION_STATE = {
  ENTERING: 'entering',
  EXITING: 'exiting',
  ENTERED: 'entered',
  EXITED: 'exited'
} 

const useTransition = (duration = 1000) => {

  const [state, setState] = useState(TRANSITION_STATE.EXITED)

  useEffect(() => {

    let timerID : any

    if (state === TRANSITION_STATE.ENTERING) {
      timerID = setTimeout(() => setState(TRANSITION_STATE.ENTERED), duration)
    } else if (state === TRANSITION_STATE.EXITING) {
      timerID = setTimeout(() => setState(TRANSITION_STATE.EXITED), duration)
    } 

    return () => {
      timerID && clearTimeout(timerID)
    }
  })
  
  return [state, setState as any]
}

export const useTransitionControl = (duration = 1000) => {

  const [state, setState] = useTransition(duration)

  const enter = () => {
    console.log('ENTER?', state)
    if (state !== TRANSITION_STATE.ENTERING) {
      console.log('GOOOOOOOo')
      setState(TRANSITION_STATE.ENTERING)
    }
  }

  const exit = () => {
    if (state !== TRANSITION_STATE.ENTERING) {
      setState(TRANSITION_STATE.EXITING)
    }
  }

  return [state, enter, exit]
}