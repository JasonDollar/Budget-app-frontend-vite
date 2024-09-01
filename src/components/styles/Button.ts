import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  color: #eee;
  background-color: ${props => props.theme.mainThemeColor};
  border: none;
  border-radius: 7px;
  font-size: 2rem;
  padding: 1rem 1.5rem;
  &:hover {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.05)
    ) ${props => props.theme.mainThemeColor} ;
    /* filter: brightness(95%); */

  }
  &:active {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ) ${props => props.theme.mainThemeColor} ;
    /* filter: brightness(95%); */

  }
`