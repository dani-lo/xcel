import React from 'react'

import { Order } from 'lib/collections/order'
import { deleteOrder } from 'lib/api/ordersApi'

import { useXcelContext } from 'data/provider'
import { REDUCER_ACTIONS } from 'data/reducer'
import { notifySuccess, notifyError } from 'data/shortcuts'

import { useFadeIn } from 'hooks/useTransition'

import { XButton, XOrder } from 'styles/styled'
import { userBasket } from 'lib/api/basketApi'
import { Basket } from 'lib/collections/basket'

export const OrdersList = ({ orders }: { orders: Order[]}) => {

  const { update, appstate } = useXcelContext()

  const cname = useFadeIn(500)

  return <> { orders.map((order, i) => {

      const product = appstate.products.find(p => p.id === order.product_id)

      if (!product) {
        return null
      }

      return <XOrder key={ `orders-${ i } ${ cname }`}>
          <div className="padding-dub-right">
            <img src={ product.img_a} />
          </div>
          <div className="padding-dub-left">
            <h3 className="txt-medium">{ product.name } x { order.quantity }</h3>
            <p  className="txt-small">{ order.unit_price * order.quantity }</p>
          </div>
          <div>
            <XButton 
              onClick={ async () => {
                try {

                  await deleteOrder(order)

                  const newBasketData = await userBasket()
                  const newBasket = new Basket(newBasketData.data)

                  update({
                    type: REDUCER_ACTIONS.INIT_BASKET,
                    payload: {
                      basket: newBasket
                    }
                  })

                  notifySuccess(update, 'Order deleted successfully')
                } catch (e) {
                  notifyError(update, 'Order could not be deleted')
                }
              }}
              size="small">
                delete
            </XButton>
          </div>
        </XOrder>
      })
    }
  </>
}