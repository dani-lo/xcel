import { AppNotification } from "components/widget/notifiction"
import { Basket } from "lib/collections/basket"
import { Order } from "lib/collections/order"
import { Product } from "lib/collections/product"
import { User } from "lib/collections/user"

export enum REDUCER_ACTIONS {
  INIT_BASKET,
  REMOVE_BASKET,
  SET_USER,
  INIT,
  NOTIFY
}

export interface AppState {
  user : User | null;
  products: Product[];
  basket: Basket | null;
  notify: AppNotification | null;
}


export const initialState = {
  user: null,
  products: [],
  notify: null,
  basket: null
}

/**
 * 
 * @param state 
 * @param payload 
 */
const setUser = (state: AppState, payload: any) => {
  const user = payload.user 

  return { ...state, user }
} 

/**
 * 
 * @param payload 
 */
const initApp = (payload: any) => {
  const user = payload.user as User | null
  const products = payload.products as Product[]
  const notify = payload.notify as AppNotification | null
  const basket = payload.basket as Basket | null
  
  return {
    user,
    products,
    basket,
    notify
  }
}

/**
 * 
 * @param payload 
 */
const initBasket = (state: AppState, payload: any) => {
  const basket = payload.basket as Basket | null
  
  return {
    ...state,
    basket
  }
}

/**
 * 
 * @param state 
 * @param payload 
 */
const setNotification = (state: AppState, payload: any) => {

  return {
    ...state,
    notify: { ...payload }
  }
}

/**
 * 
 * @param state 
 * @param payload 
 */
const basketRemove =  (state: AppState, payload: any) => {
  const order = payload.order || {}

  const orders = state.user?.orders?.reduce((acc : Order[], curr: Order) => {
    if (curr.id !== order.id) {
      acc.push(curr)
    } 
    return acc
  }, []) || []

  return {
    ...state,
    user: { ...(state.user || {}), orders } as User
  }
}


export const appReducer = (state: AppState, action: { type: REDUCER_ACTIONS, payload: any}): AppState => {
  switch (action.type) {
    
    case REDUCER_ACTIONS.INIT:
      return initApp(action.payload)

    case REDUCER_ACTIONS.SET_USER: 
      return setUser(state, action.payload)

      case REDUCER_ACTIONS.INIT_BASKET: 
      return initBasket(state, action.payload)

    case REDUCER_ACTIONS.NOTIFY:
      return setNotification(state, action.payload)
    
    default: return state
  }
}
