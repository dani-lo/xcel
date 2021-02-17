import { AppNotification } from "components/widget/notifiction"

import { Basket } from "lib/collections/basket"
import { Order } from "lib/collections/order"
import { Product } from "lib/collections/product"
import { User } from "lib/collections/user"
import { Account } from "lib/collections/account"


export enum APP_STATUS {
  LOGGED_IN,
  LOGGED_OUT,
  NONE
}

export enum REDUCER_ACTIONS {
  INIT_BASKET,
  REMOVE_FROM_BASKET,
  LOGIN_USER,
  LOGOUT_USER,
  INIT,
  NOTIFY,
  UNNOTIFY,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT
}

export interface AppState {
  user : User | null;
  products: Product[];
  basket: Basket | null;
  notify: AppNotification[];
  status: APP_STATUS;
}


export const initialState = {
  user: null,
  products: [],
  notify: [],
  basket: null,
  status: APP_STATUS.NONE
}

/**
 * 
 * @param state 
 * @param payload 
 */
const setUser = (state: AppState, payload: { user: User }) => {
  const user = payload.user 

  return { ...state, user }
} 

/**
 * 
 * @param state 
 */
const unsetUser = (state: AppState) => {

  return { ...state, user : null}
} 

/**
 * 
 * @param payload 
 */
const initApp = (payload: AppState) => {
  const user = payload.user as User | null
  const products = payload.products as Product[]
  const basket = payload.basket as Basket | null
  
  const appStatus = user === null ? APP_STATUS.LOGGED_OUT : APP_STATUS.LOGGED_IN

  return {
    user,
    products,
    basket,
    notify : [],
    status: appStatus
  }
}

/**
 * 
 * @param payload 
 */
const initBasket = (state: AppState, payload: { basket: Basket }) => {
  const basket = payload.basket as Basket | null
  
  return {
    ...state,
    basket
  }
}

/**
 * 
 * @param payload 
 */
const removeFromBasket = (state: AppState, payload: { order: Order }) => {
  const order = payload.order

  if (order && state.basket?.orders) {

    const newOrders : Order[] = state.basket.orders.reduce((acc : Order[], currOrder : Order) => {
      if (currOrder.id !== order.id) {
        acc.push(currOrder)
      }
      return acc
    }, [])

    return {
      ...state,
      basket: {
        ...state.basket,
        orders: newOrders
      }
    }
  }

  return {
    ...state
  }
}

/**
 * 
 * @param state 
 * @param payload 
 */
const setNotification = (state: AppState, payload: AppNotification) => {

  const notifications = state.notify || []

  notifications.push(payload)

  return {
    ...state,
    notify: notifications
  }
}

/**
 * 
 * @param state 
 * @param payload 
 */
const removeNotification = (state: AppState, payload: { id: number }) => {

  const notifications : AppNotification[] = (state.notify || []).reduce((acc : AppNotification[], curr : AppNotification) => {
    if (curr.id !== payload.id) {
      acc.push(curr)
    }
    return acc
  }, [])

  return {
    ...state,
    notify: notifications
  }
}

/**
 * 
 * @param state 
 * @param payload 
 */
const updateAccount = (state: AppState, payload: { account : Account }) => {

  if (state.user) {
    return {
      ...state,
      user: { ...state.user, account: payload.account }
    }
  }
  
  return state
}

/**
 * 
 * @param state 
 * @param payload 
 */
const addAccount = (state: AppState, payload: { account : Account }) => {

  if (state.user) {
    return {
      ...state,
      user: { ...state.user, account: payload.account }
    }
  }
  
  return state
}

export const appReducer = (state: AppState, action: { type: REDUCER_ACTIONS, payload : any}): AppState => {
  switch (action.type) {
    
    case REDUCER_ACTIONS.INIT:
      return initApp(action.payload)

    case REDUCER_ACTIONS.LOGIN_USER: 
      return setUser(state, action.payload)

    case REDUCER_ACTIONS.LOGOUT_USER: 
      return unsetUser(state)

    case REDUCER_ACTIONS.INIT_BASKET: 
      return initBasket(state, action.payload)

    case REDUCER_ACTIONS.NOTIFY:
      return setNotification(state, action.payload)

    case REDUCER_ACTIONS.UNNOTIFY:
      return removeNotification(state, action.payload)

    case REDUCER_ACTIONS.UPDATE_ACCOUNT:
      return updateAccount(state, action.payload)

    case REDUCER_ACTIONS.ADD_ACCOUNT:
      return addAccount(state, action.payload)

    case REDUCER_ACTIONS.REMOVE_FROM_BASKET:
      return removeFromBasket(state, action.payload)

    default: return state
  }
}