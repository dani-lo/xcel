import styled from 'styled-components'

/**
 * XButton
 */
const XButton = styled.button<{size: string;}>`
  border: 1px solid var(--border);
  font-size: var(--font-${ props => props.size });
  padding: var(--pad-2) var(--pad-5);
  background: var(--white);
  cursor: pointer;
  border-radius: var(--border-rad);

  &:hover {
    background: var(--highlight);
    color: var(--white);
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
  display: flex;

  img {
    width: 200px;
  }
`

XProduct.displayName = 'XProduct'

export {
  XButton,
  XImgButton,
  XProduct
}