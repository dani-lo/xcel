import styled from 'styled-components'

/**
 * XButton
 */
const XButton = styled.button<{size: string;}>`
  /* border: 2px solid var(--border); */
  border: none;
  font-size: var(--font-${ props => props.size });
  padding: var(--pad-2) var(--pad-4);
  
  cursor: pointer;
  border-radius: 0;
  background: var(--white);
  color: var(--black);
  border: 2px solid var(--black);
  ${ props => props.disabled ? 'opacity: 0.5; pointer-events: none;' : '' }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    background: var(--highlight-light);
    color: var(--white);
  }
`

XButton.displayName = 'XButton'

/**
 * XImgButton
 */
const XImgButton = styled.button``

XImgButton.displayName = 'XImgButton'

/**
 * XProduct
 */
const XProduct = styled.div`
  
  border-top: 2px solid var(--bg);
  padding: 2em 0 2em;
  margin-top: 1em;
  
  h3 {
    

    &.prod-title {
      background: var(--black);
      color: var(--white);
      padding: var(--pad-2);
      text-align: center;
    }
  }

  img {
    width: 80%;
  }

  .price {
    border-bottom: 1px solid var(--border);
  }

  > div {
    display: flex;
    > div {
      flex: 1.5;

      &:first-child {
        flex: 1;
      }
    }
  }
`

XProduct.displayName = 'XProduct'

/**
 * XProduct
 */
const XFormError = styled.div`
  display: flex;

  img {
    width: 200px;
  }
`

XFormError.displayName = 'XFormError'

/**
 * const XFormInputTxt = styled.div`
 */
const XFormInputTxt = styled.div`
  
  label {
    display: block;
    margin: var(--pad-1) 0;
  }
  input {
    padding: var(--pad-2);

  }
`

XFormInputTxt.displayName = 'XFormInputTxt'

/**
 * const XFormInputTxt = styled.div`
 */
const XFormInputSubmit = styled.div<{ size: string; disabled ?: boolean}>`
  
  display: inline-block;
  border: none!important;

  input {
      /* border: 2px solid var(--border); */
    ${ props => props.disabled ? 'opacity: 0.6; pointer-events: none;' : '' }
    font-size: var(--font-${ props => props.size });
    padding: var(--pad-2) var(--pad-4);
    
    cursor: pointer;
    border-radius: 0x;
    background: var(--white);
    color: var(--black);
    border: 2px solid var(--black);

    &:hover {
      opacity: 0.7;
    }

    &:active {
      background: var(--highlight-light);
      color: var(--white);
    }
  } 
`

XFormInputSubmit.displayName = 'XFormInputSubmit'

const XPayButton = styled(XButton)`
  a {
    text-decoration: none;
  }
`


/**
 * XSection
 */
const XSection = styled.div<{ highlight ?: boolean }>`
  
  margin: var(--pad-5) 0;
  background: ${ props => props.highlight ? 'var(--white)' : 'var(--white)'};
  color: ${ props => props.highlight ? 'var(--black)' : 'var(--txt-black)'};
  ${ props => props.highlight ? '' : ''}  
`

XSection.displayName = 'XSection'

const XSectionHighlight = styled.div`
  padding: var(--pad-5);
  background: var(--bg);
  color: var(--black);
  .highlight-content {
    width: 1200px;
    display: flex;
    margin: auto;
    justify-content: space-around;

    .hero {
      padding: 2rem;
      background: var(--white);
      border-bottom: 1px solid var(--black);
      h3 {
        
      }
    }
  }

  > div {
    flex: 1;
  }

  div.product {
    width: 200px;
    height: 200px;
    background-size: cover;
    border: 1px solid var(--border);
  }
`

XSectionHighlight.displayName = 'XSectionHighlight'

/**
 * XScroller
 */
const XScroller = styled.div`
  
  /* padding: 0 var(--pad-5);
  margin: var(--pad-5) 0;
  background: var(--white);
  border: 1px solid var(--border); */
`

XScroller.displayName = 'XScroller'

const XPurchase = styled.div`
  display: flex;

  button {
    border-radius: 0;
  }
  input {
    width: 25px;
    border-radius: 0;
    border: 1px solid var(--border);
    border-right: none;
    padding-left: 1em;
  }
  > div {
    display: flex;
    flex-direction: column;

    i {
      border: 1px solid var(--border);
      background: var(--bg-grad);
      padding: 6px;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`

XPurchase.displayName + 'XPurchase'

const XPageTitle = styled.h2`

  color: var(--txt-main);
  /* border: 1px solid var(--border); */
  text-align: center;
  background: var(--bg);
`

const XOrder = styled.div`

  border-bottom: 1px dashed var(--border);

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0.5em 0;

    @media only screen and (max-width: 800px) {
      justify-content: flex-start;
    }

    img {
      width: 75px;
    }

    div:last-child  {
      flex: 2;
      text-align: right;
    }
  }
 
`

XOrder.displayName = 'XOrder'

const XContent = styled.div`
  padding: var(--pad-6) 0;
`

XContent.displayName = 'XContent'


const XViewAccount = styled.ul`

  li {
    list-style: none;
    border-bottom: 1px dotted var(--border);
    span {
      display: inline-block;
      width: 250px;
      font-weight: bold;
    }
  }
`

XViewAccount.displayName = 'XViewAccount'

const XContentMain = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

XContentMain.displayName = 'XContentMain'

export {
  XButton,
  XImgButton,
  XProduct,
  XFormError,
  XFormInputTxt,
  XFormInputSubmit,
  XSection,
  XSectionHighlight,
  XScroller,
  XPurchase,
  XPageTitle,
  XOrder,
  XContent,
  XPayButton,
  XViewAccount,
  XContentMain
}