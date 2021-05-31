import React, { Dispatch, useContext } from 'react'

import { AppState, REDUCER_ACTIONS } from 'data/reducer'

interface ContextProps {
  appstate: AppState;
  update: Dispatch<{ type: REDUCER_ACTIONS; payload : any; }>
}

export const AppContext = React.createContext({} as ContextProps)
export const useXcelContext = () => useContext(AppContext)