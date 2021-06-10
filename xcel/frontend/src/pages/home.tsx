import React, { useState } from 'react'
import styled from 'styled-components'

import { useXcelContext } from 'data/provider'

import { XButton, XContentMain, XPageTitle, XSection, XSectionHighlight } from 'styles/styled'

import { Ingredient } from 'lib/collections/ingredient'
import { Product } from 'lib/collections/product'

import { IngredientsModal } from 'components/widget/ingredients'

const StyledPhotoBG = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  margin-top: 4em;

  p {
    span {
      color: var(--black);
      line-height: 1.4em;
    }
  }
`

const StyledMainLogo = styled.img`
  @media only screen and (max-width: 800px) {
    margin: 2em auto;
    display: block;
  }
`

export const HomePage = () => {

  const { appstate } = useXcelContext()

  
  const [ingredients, setIngredients] = useState(false)
  
  const products = appstate.products || []

  const allIngredients = products.reduce((acc : Ingredient[], product : Product) => {
    product.ingredients.forEach(productIngredient => {
      if (!acc.find(accIngredient => accIngredient.name === productIngredient.name)) {
        acc.push(productIngredient)
      }
    })
    return acc
  }, [])

	return <>
  <XPageTitle className="cap">IXCEL nature</XPageTitle>
  <XContentMain>
    <XSection>
        <div className="flex-row block-responsive-small">
          <StyledMainLogo src="/media/company/xcel-logo.png" className="logo-main" />
          <div>
            <h3>Feel the nature in you</h3>
            <p>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepi</p>
            <p>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepi</p>
          </div>
        </div>
      </XSection>
  </XContentMain>
    <XSectionHighlight className="fw"> 
        <div className="highlight-content">
          
          {
            products.map((product, i) => {
              
              const cname = i % 2 === 0 ? "hero" : "hero padding-dub-left padding-dub-right"
              const bgImg = `url("${ product.img_a }")`

              return <div key={ `prod-${ i }` } className={ cname }>
                
                <div className="product" style={{ backgroundImage: bgImg }}></div>
                <h3 className="txt-small padding-half-top margin-half-top">{ product.name}</h3>
                {/* <p>{ product.description.substring(0, 50) }...</p> */}
                <XButton size="small">more</XButton>
              </div>
            })
          }
        </div>
    </XSectionHighlight>
    <XContentMain>
      
      
      
      <XSection className="flex-row block-responsive-small">
        <img src="/media/product_images/ingredients/b.png" className="margin-half-right fullwidth" />
        <img src="/media/product_images/ingredients/b.png" className="margin-half-left hide-responsive-small fullwidth" />
      </XSection>
      <XSection>
        <h2>Ingredients!</h2>
        <h3>(it is all about the ingredients)</h3>
        <p>Pipso dolor sit amet etiam vo or sit amet etiam vo or sit amet etiam voor sit amet etiam voor sit amet etiam vo or sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo</p>
        <XButton size="small" onClick={ () => setIngredients(true) } className="margin-dub-top">View All Our Ingredients</XButton>
      </XSection>
    </XContentMain>
    <XSectionHighlight  className="rw">
      <img  src="/media/company/dani.png" className="fullwidth" />
      <div className="padding-top">
        <h3>Meet Daniela</h3>
        <p>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo </p>
        <p>Pop dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet e</p>
      </div>
      <img  src="/media/company/dani-kids.png" className="hide-responsive-small fullwidth" />
    </XSectionHighlight>
    <XSectionHighlight className="fw"> 
      <div className="highlight-content">
        <div>
          <img width="400" src="/media/company/dani.png" />
        </div>
        <div className="padding-dub-left padding-dub-right">
          <h3>Meet Daniela</h3>
          <p>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo </p>
          <p>Pop dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet e</p>
        </div>
        <div>
          <img width="400" src="/media/company/dani-kids.png" />
        </div>
      </div>
    </XSectionHighlight>
    <XContentMain>
    
    <XSection style={{ position: 'relative' }}>
      <StyledPhotoBG>
        <p className="note">
          <span>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet  titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet  titinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilo</span>
        </p>
        <p className="note">
          <span>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet  titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet  titinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilo</span>
        </p>
      </StyledPhotoBG>

    </XSection>
    </XContentMain>
    {
      ingredients ? <IngredientsModal
        ingredients={ allIngredients }
        closeModal={ () => setIngredients(false) }
      /> : null
    }
	</>
	
}