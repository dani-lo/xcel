import React, { useState } from 'react'

import { XButton, XPurchase } from 'styles/styled'

interface Props {
  onBuyProduct: (q: number) => void;
}

export const CreateOrder = (props : Props) => {

  const [quantity, setQuantity] = useState(1)

  return <XPurchase>
    <XButton 
      style={{boxShadow: 'none' }}
      onClick={ () => props.onBuyProduct(quantity) }
      size="small">place order</XButton>
    <input value={ quantity } />
    <div>
      <i className="fas fa-plus" onClick={ () => setQuantity(quantity + 1) } />
      <i className="fas fa-minus" onClick={ () => quantity  > 1 ? setQuantity(quantity - 1) : void 0 } />
    </div>
  </XPurchase>
}