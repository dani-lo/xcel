import React from 'react'

import { Order } from '../../lib/collections/order'
import { deleteOrder } from '../../lib/api/ordersApi'

import { useXcelContext } from '../../data/provider'
import { REDUCER_ACTIONS } from '../../data/reducer'

import { NotificationType } from '../widget/notifiction'

import { XButton } from '../../styles/styled'

export const OrdersList = ({ orders }: { orders: Order[]}) => {

  const { update } = useXcelContext()

  return <>
      {
      orders.map((order, i) => {
        return <div key={ `orders-${ i }`}>
          <h3>- { i }</h3>
          <p>{ order.product.name } x { order.quantity }</p>
          <p>{ order.unit_price * order.quantity }</p>
          <XButton 
            onClick={ async () => {
              try {
                await deleteOrder(order)

                update({
                  type: REDUCER_ACTIONS.BASKET_REMOVE,
                  payload: {
                    order
                  }
                })
                update({
                  type: REDUCER_ACTIONS.NOTIFY,
                  payload: {
                    msg: 'Order deleted',
                    type: NotificationType.SUCCESS,
                    donotify: true
                  }
                })
              } catch (e) {
                update({
                  type: REDUCER_ACTIONS.NOTIFY,
                  payload: {
                    msg: 'Order could not be deleted',
                    type: NotificationType.ERROR,
                    donotify: true
                  }
                })
              }
            }}
            size="small">
              <span className="material-icons padding-half-right">clear</span>
              <span>delete</span>
            </XButton>
        </div>
      })
      }
    </>
}