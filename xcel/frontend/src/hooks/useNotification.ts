import { useEffect } from 'react'

import { AppState, REDUCER_ACTIONS } from 'data/reducer'

export const useNotification = (appstate : AppState, update: (a: {type: REDUCER_ACTIONS, payload: any}) => void) => {

  useEffect(() => {
    let toUnNotify : any

    if (appstate.notify.length) {

      for (let n of appstate.notify) {
        
      }
      toUnNotify = setTimeout(() => {

        update({
          type: REDUCER_ACTIONS.NOTIFY,
          payload: {
            msg: null,
            type: null,
            donotify: false
          }
        })

      }, 2500)
    }
    return () => toUnNotify && clearTimeout(toUnNotify)
  })
}