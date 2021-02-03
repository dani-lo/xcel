import styled from 'styled-components'

/**
 * XButton
 */
const XButton = styled.button<{size: string;}>`
  border: 1px solid var(--border);
  font-size: var(--font-${ props => props.size });
  padding: var(--pad-2) var(--pad-4);
  
  cursor: pointer;
  border-radius: var(--border-rad);
  background: var(--highlight);
  color: var(--white);

  &:hover {
    background: var(--white);
    color:(--txt-main);
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
 
  width: 50%;
  img {
    width: 300px;
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

  input {
    border: 1px solid var(--border);
    font-size: var(--font-${ props => props.size });
    padding: var(--pad-2) var(--pad-4);
    cursor: pointer;
    border-radius: var(--border-rad);
    background: var(--highlight);
    color: var(--white);

    &:hover {
      background: var(--white);
      color:(--txt-main);
    }

    &:active {
      background: var(--highlight-light);
      color: var(--white);
    }
  } 
`

XFormInputSubmit.displayName = 'XFormInputSubmit'

/**
 * XSection
 */
const XSection = styled.div<{ highlight ?: boolean }>`
  
  padding: var(--pad-5) 0;
  margin: var(--pad-5) 0;
  background: ${ props => props.highlight ? 'var(--highlight-light)' : 'transparent'};
  padding: ${ props => props.highlight ? 'var(--pad-5)' : '0'};
`

XSection.displayName = 'XSection'

export {
  XButton,
  XImgButton,
  XProduct,
  XFormError,
  XFormInputTxt,
  XFormInputSubmit,
  XSection
}