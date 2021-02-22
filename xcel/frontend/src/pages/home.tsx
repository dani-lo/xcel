import React from 'react'
import styled from 'styled-components'

import { XButton, XContentMain, XPageTitle, XSection, XSectionHighlight } from '../styles/styled'

const StyledPhotosComp = styled.div`
  img {
    width: 384px;
    margin: 0 2em 2em;

  }
`

const StyledPhotoBG = styled.div`
  /* position: fixed; */
  width: 100%;
  height: 100%;
  background-image: url(/media/company/big-ingredients.png);
  background-repeat: no-repeat;
  margin-top: 4em;
  /* img {
    width: 100%;
    height: 100%;
  } */
  p {
    span {
      color: var(--black);
      background: var(--white);
      line-height: 3em;
      padding: 0.5em;
    }
  }
`

export const HomePage = () => {

	return <>
    <XContentMain>
      <XPageTitle className="txt-large margin padding-dub txt-center">IXCEL nature</XPageTitle>
      <XSection>
        <div className="flex-row">
          <img src="/media/company/xcel-logo.png" />
            <div>
              <h3 className="txt-medium padding-top padding-bottom margin-top margin-bottom">Feel the nature in you</h3>
              <p className="txt-small padding-top margin-bottom">Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepi</p>
              <p className="txt-small padding-top margin-bottom">Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepi</p>
            </div>
        </div>
      </XSection>
      <XSection>
        <StyledPhotosComp className="flex-row margin-dub-top padding-dub-top" style={{ alignItems: 'flex-start' }}>
          <img src="/media/product_images/ingredients/b.png" />
          <div>
            <h2 className="text-jumbo padding-left padding-bottom margin-left">Ingredients Ingredients Ingredients</h2>
            <h3 className="text-large padding-left padding-bottom margin-left">(it is all about the ingredients)</h3>
            <p className="txt-small padding-left padding-bottom margin-left">Pipso dolor sit amet etiam vo or sit amet etiam vo or sit amet etiam voor sit amet etiam voor sit amet etiam vo or sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo on adepilor sit amet etiam vouptitinmo non adepilor sit amet etiam vouptitinmo</p>
            <p className="txt-small padding-left padding-bottom margin-left">
              <XButton size="small" onClick={ () => void 0 }>View All Our Ingredients</XButton>
              </p>
          </div>
        </StyledPhotosComp>
      </XSection>
    </XContentMain>
    <XSectionHighlight className="margin-dub-top">

      <div className="highlight-content">
        <div>
          <img width="400" src="/media/company/dani.png" />
        </div>
        <div className="padding-dub-left padding-dub-right">
          <h3 className="txt-jumbo margin-dub-bottom">Meet the Artist</h3>
          <p className="txt-small margin-dub-top">Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo </p>
          <p className="txt-small margin-dub-top">Pop dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet e</p>
        </div>
        <div>
          <img width="400" src="/media/company/dani-kids.png" />
        </div>
      </div>
    </XSectionHighlight>
    <XContentMain>
    
    <XSection style={{ position: 'relative' }}>
      <StyledPhotoBG>
        {/* <img src="/media/company/big-ingredients.png" /> */}
        <p className="padding text-large note">
          <span>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet  titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet  titinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilo</span>
        </p>
        <p className="margin text-large note">
          <span>Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet  titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet titinmo non adepilor sit amet  titinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilo</span>
        </p>
      </StyledPhotoBG>

    </XSection>
      
    </XContentMain>
	</>
	
}