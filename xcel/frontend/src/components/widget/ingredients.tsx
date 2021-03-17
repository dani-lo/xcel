import React, { useState } from 'react'
import styled from 'styled-components'

import { AppModal } from 'components/widget/modal'

import { Ingredient } from 'lib/collections/ingredient'


interface Props {
  ingredients: Ingredient[];
  closeModal: () => void;
}

const Styledingredients = styled.div`
  display: flex;
  align-items: center;

  i {
    font-size: 2em;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    &.disabled {  
      opacity: 0.5;
      pointer-events: none;
    }
  }
`

export const IngredientsModal = ({ ingredients, closeModal } : Props) => {

  const [curr, setCurr] = useState(0)

  return <AppModal closeModal={ closeModal }>
    <Styledingredients>
      <i 
        className={ `fas fa-caret-left ${ curr == 0 ? 'disabled' : ''} margin-right` } 
        onClick={ () => setCurr(curr - 1) }  
      />
      <div className="padding-right padding-left">
        <h3>{ ingredients[curr].name }</h3>
        <p>{ ingredients[curr].description }</p>  
      </div>
      <i 
        className={ `fas fa-caret-right ${ curr == ingredients.length - 1 ? 'disabled' : ''} margin-left` } 
        onClick={ () => setCurr(curr + 1) }  
      />
      </Styledingredients>
  </AppModal>
}