import { useEffect } from 'react'

import { AppState, REDUCER_ACTIONS } from '../data/reducer'

export const useNotification = (appstate : AppState, update: (a: {type: REDUCER_ACTIONS, payload: any}) => void) => {
  
  useEffect(() => {
    if (appstate.notify?.donotify) {

      const timer : any = setTimeout(() => {
        update({
          type: REDUCER_ACTIONS.NOTIFY,
          payload: {
            msg: null,
            type: null,
            donotify: false
          }
        })

        return clearTimeout(timer)
      }, 4000)
    }
  }, [])
}