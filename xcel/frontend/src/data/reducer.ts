export enum REDUCER_ACTIONS {
  BASKET_ADD,
  BASKET_REMOVE
}

interface State {
  orders: []
}

const basketAdd = (state: State, payload: any) => {
  return state
} 

export const reducer = (state: State, action: { type: REDUCER_ACTIONS, payload: any}): State => {
  switch (action.type) {
    
    case REDUCER_ACTIONS.BASKET_ADD: 
      return basketAdd(state, action.payload)
    
    
      
    default: return state
  }
}
