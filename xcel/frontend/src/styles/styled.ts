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
  
  border-bottom: 2px dashed var(--border);
  padding: 0 0 2em;


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
  
  margin: var(--pad-5) 0;

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
const XFormInputSubmit = styled.div<{ size: string}>`
  
  margin: var(--pad-5) 0;
  display: inline-block;
  border: none!important;

  input {
      /* border: 2px solid var(--border); */
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
  
  margin: var(--pad-3) 0;
  background: ${ props => props.highlight ? 'var(--black)' : 'var(--white)'};
  color: ${ props => props.highlight ? 'var(--white)' : 'var(--txt-main)'};
  padding: ${ props => props.highlight ? 'var(--pad-5)' : 'var(--pad-5)'};
`

XSection.displayName = 'XSection'

/**
 * XScroller
 */
const XScroller = styled.div`
  
  padding: 0 var(--pad-5);
  margin: var(--pad-5) 0;
  background: var(--white);
  border: 1px solid var(--border);
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
  /* background: var(--white); */
`

const XOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border);
  padding: 0.5em 0;

  img {
    width: 75px;
  }

  div:last-child  {
    flex: 2;
    text-align: right;
  }
`

XOrder.displayName = 'XOrder'

const XContent = styled.div`
  padding: var(--pad-6) 0;
`

XContent.displayName = 'XContent'


export {
  XButton,
  XImgButton,
  XProduct,
  XFormError,
  XFormInputTxt,
  XFormInputSubmit,
  XSection,
  XScroller,
  XPurchase,
  XPageTitle,
  XOrder,
  XContent,
  XPayButton
}