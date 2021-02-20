import React from 'react'
import styled from 'styled-components'

import { XContentMain, XPageTitle, XSection, XSectionHighlight } from '../styles/styled'

const StyledPhotosComp = styled.div`
  img {
    width: 384px;
    margin: 2em;

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
        <StyledPhotosComp>
          <img src="/media/product_images/ingredients/b.png" />
          <img src="/media/product_images/ingredients/c.png" />
        </StyledPhotosComp>
      </XSection>
    </XContentMain>
    <XSectionHighlight className="margin-dub-top">
      <div>
        <img width="400" src="/media/company/dani.png" />
      </div>
      <div className="padding-dub-left padding-dub-right">
        <h3 className="txt-jumbo margin-dub-bottom">meet the cream maker</h3>
        <p className="text-small margin-dub-top">Lorem ipso dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet eo dolor sit amet etiam vouptitinmo non adepilor sit amet e</p>
      </div>
      <div>
        <img width="400" src="/media/company/dani.png" />
      </div>
    </XSectionHighlight>
    <XContentMain>
      <XSection>
          <StyledPhotosComp>
            <img src="/media/product_images/ingredients/d.png" />
            <img src="/media/product_images/ingredients/e.png" />
          </StyledPhotosComp>
      </XSection>
    </XContentMain>
	</>
	
}