import styled from "styled-components";

const HeaderBox = styled.div<{ bottomAdditionalSpace: number }>`
  max-height: 30rem;
  background: ${props => props.theme.mainThemeColor};
  margin: 0;
  padding-bottom: ${props => props.bottomAdditionalSpace / 2}px;

  h1 {
    margin: 0;
    padding: 1rem 1.5rem;
    color: #fff;
    font-weight: 300;
    @media (min-width: 768px) {
      /* padding: 2rem 1.5rem; */
    }
  }

  p {
    margin: 0;
    padding: 1rem 1.5rem;
    padding-bottom: 0rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menuIconMobile {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 3rem;
    margin: 1.5rem 2rem;

    span {
      width: 100%;
      height: 3px;
      background: #fff;

      &:not(:last-child) {
        margin-bottom: .5rem;
      }
    }
  }
`

export default HeaderBox