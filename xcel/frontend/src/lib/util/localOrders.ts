import { Order } from "lib/collections/order"
import { Product } from "lib/collections/product"

export const getLocalOrders = () : Order[] => {
  const savedOrders = localStorage.getItem('orders')

  return savedOrders ? JSON.parse(savedOrders) : [] as Order[]
}

export const getLocalOrdersTotal = () => {
  const savedOrders = getLocalOrders()

  return savedOrders.reduce((acc, order) => {   
    
    return acc + (parseFloat(order.unit_price) * order.quantity)
  }, 0)
}

export const placeLocalOrder  = (p : Product, quantity: number) => {

  let orders : Order[] = []

  const existingOrders = getLocalOrders()
  const existingProductOrder = existingOrders.find((order : Order) => order.product_id === p.id) 

  if (existingProductOrder) {
    orders = existingOrders.reduce((acc : Order[], curr: Order) : Order[] => {
      if (curr.product_id == p.id) {
        acc.push({
          ...curr,
          quantity: curr.quantity + quantity
        })
      } else {
        acc.push(curr)
      }

      return acc
    }, [])
  } else {
    orders = [
      ...existingOrders,
      { 
        id: new Date().getTime(),
        unit_price: p.price,
        product_id: p.id,
        quantity,
        status: ''
      }
    ]
  }

  localStorage.setItem('orders', JSON.stringify(orders))
}

export const deleteLocalOrder  = (oid: number) => {

  const existingOrders = getLocalOrders() || []

  const newOrders = existingOrders.reduce((acc: Order[], order : Order) : Order[] => {
    if (order.id !== oid) {
      acc.push(order)
    }
    return acc
  }, [])

  localStorage.setItem('orders', JSON.stringify(newOrders))
}