import styled from 'styled-components'

const ButtonsContainer = styled.div<{ buttons: number }>`
  display: flex;
  justify-content: space-between;
  @media(min-width: 576px) {
    justify-content: center;
  }
  & > * {
    width: ${props => props.buttons ? (100 - 5) / props.buttons : 100}%;
    @media(min-width: 576px) {
      width: ${props => props.buttons > 5 ? (100 - 5) / props.buttons : (100 - 30) / props.buttons}%;
      margin: 0 2rem;
    }
  }
`

const BigButton = styled.button<{danger?: boolean, alert?: boolean, fontSize?: number, wide?: boolean}>`
  cursor: pointer;
  font-size: ${props => props.fontSize ? props.fontSize * 2 : 2}rem;
  background: ${props => {
    if (props.danger) return props.theme.colorDanger
    if (props.alert) return props.theme.colorAlert
    return props.theme.mainThemeColor
  }};
  color: ${props => props.theme.textColorInverted};
  border: none;
  border-radius: 10px;
  box-shadow: ${props => props.theme.boxShadow};
  width: ${props => props.wide ? 100 : 'auto'}%;
  & a {
    display: block;
    padding: 1rem 2rem;
  }
`

export { BigButton, ButtonsContainer }