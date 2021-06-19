import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';

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

  const history = useHistory();
  const gotoShop = useCallback((i) => history.push(`/shop#p-${ i }`), [history]);

	return <>
  
    <XContentMain  className="margin-dub-bottom">
      <XPageTitle className="cap">IXCEL nature</XPageTitle>
       <XContentMain className="padding-dub-top">
      <XSection>
        <div className="flex-row block-responsive-small">
          <StyledMainLogo src="/media/company/xcel-logo.png" className="logo-main" />
          <div>
            <p className="txt-small padding-bottom">We are a small family run business, dedicated to offering you the same benefits we find daily from out home made range of body creams</p>
            <h3>Our Mission Statement</h3>
            <p className="txt-small padding-top padding-bottom">We are committed to the highest hygiene standards and quality. We have produce our own body treatments and creams because we love it and believe in it.</p>
            <p className="txt-small padding-bottom">We sincerely hope that if you try our products, we are sure that you will get as much benefit from them as much as our family does.</p>
          </div>
        </div>
      </XSection>
      </XContentMain>
      
      <h3 className="text-medium">How we started</h3>
      <p className="txt-small padding-top padding-bottom">We have two beautiful kids: back when our first was born we were looking at body creams, nappy rash creams and all the products you need for their wellbeing</p>
      <p className="txt-small padding-top padding-bottom">Sadly,  all we kept seeing were chemicals!Therefore we started studying the use of essential oils, through workshops and classes and we  started making our own products: the results were incredible! No more nappy rashes, no more skin reactions and we startyed using them ourselves with the result that our own skin started to feel much smoother and healthier.</p>
      <p className="txt-small padding-top padding-bottom">We gave our creams and products to a few friends and the feedback was phenomenal, in fact it was so overwhelmingly good that we decided to start a business and Ixcel Nature was born</p>
      <p className="txt-small padding-top padding-bottom">Our teams can’t wait to safely welcome you back for freshly made breakfast, lunch, organic coffees and more.  </p>
      </XContentMain>
    <XSectionHighlight className="fw margin-dub-bottom" style={{ marginTop: 'var(--pad-5)', background: 'transparent'}}> 
        <div className="highlight-content">
          
          {
            products.map((product, i) => {
              
              const cname = i % 2 === 0 ? "hero card-2" : "hero card-2 padding-dub-left padding-dub-right"
              const bgImg = `url("${ product.img_a }")`

              return <div key={ `prod-${ i }` } className={ cname }>
                
                <div className="product" style={{ backgroundImage: bgImg }}></div>
                <p className="txt-small padding-top padding-bottom margin-half-top">{ product.description.substring(0, 40)} ...</p>
                {/* <p>{ product.description.substring(0, 50) }...</p> */}
                <XButton size="small" onClick={ () => gotoShop(i) }>more</XButton>
              </div>
            })
          }
        </div>
    </XSectionHighlight>
    <XSectionHighlight className="fw margin-dub-top margin-dub-bottom"> 
      <div className="highlight-content">
        <div>
          <img width="400" src="/media/company/dani.png" />
        </div>
        <div className="padding-dub-left padding-dub-right">
           <h3>Meet Daniela</h3>
          <p className="txt-small padding-top padding-bottom">Hello! I am Daniela, I was born in the beautiful town of Como in Italy in 1976 and i spent my life studying childcare and looking after children.</p>
        <p className="txt-small padding-top padding-bottom">I am the one who created the creams we are offering you, and I hope you will feel their benefit as much as my family does!</p>
        </div>
        <div>
          <img width="400" src="/media/company/dani-kids.png" />
        </div>
      </div>
    </XSectionHighlight>
    <XContentMain className="padding-dub-top margin-dub-top">
      
      <XSection className="flex-row block-responsive-small">
        <img src="/media/product_images/ingredients/w.jpg" className="margin-half-right fullwidth" style={{ width: '455px', height: '405px' }} />
        <img src="/media/product_images/ingredients/b.png" className="margin-half-left hide-responsive-small fullwidth"  style={{ width: '455px', height: '405px' }} />
      </XSection>
      <XSection>
        <h2>Ingredients!</h2>
        <h3>(it is all about the ingredients)</h3>
        <p>The most crucial idea behind our creams is that natural ingredients have the power to help our bodies to get stronger and stimulate them into interaction/reaction rather than passively receive the benefits</p>
        <XButton size="small" onClick={ () => setIngredients(true) } className="margin-dub-top">View All Our Ingredients</XButton>
      </XSection>
    </XContentMain>
    
    
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