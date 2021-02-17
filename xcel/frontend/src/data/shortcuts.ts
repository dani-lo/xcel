import { Dispatch } from "react"

import { REDUCER_ACTIONS } from 'data/reducer'
import { NotificationType } from 'components/widget/notifiction'

/**
 * 
 * @param dispatch 
 * @param msg 
 */
export const notifySuccess = (dispatch : Dispatch<{ type: REDUCER_ACTIONS; payload : any; }>, msg : string) => {

  const id = new Date().getTime() 

  dispatch({
    type: REDUCER_ACTIONS.NOTIFY,
    payload: {
      id,
      msg,
      type: NotificationType.SUCCESS
    }
  })

  setTimeout(() => {
    dispatch({
      type: REDUCER_ACTIONS.UNNOTIFY,
      payload: {
        id
      }
    })
  }, 3000)
}

/**
 * 
 * @param dispatch 
 * @param msg 
 */
export const notifyError = (dispatch : Dispatch<{ type: REDUCER_ACTIONS; payload : any; }>, msg : string) => {

  const id = new Date().getTime() 

  dispatch({
    type: REDUCER_ACTIONS.NOTIFY,
    payload: {
      id,
      msg,
      type: NotificationType.ERROR
    }
  })

  setTimeout(() => {
    dispatch({
      type: REDUCER_ACTIONS.UNNOTIFY,
      payload: {
        id
      }
    })
  }, 3000)
}