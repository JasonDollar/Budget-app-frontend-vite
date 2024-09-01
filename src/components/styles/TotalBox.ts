import styled from 'styled-components'

const TotalBox = styled.div<{ boxSize?: number, totalAmountLength: number }>`
  margin: 0 1.5rem;
  margin-top: -${props => props?.boxSize ? props?.boxSize / 2 : 0}px;
  margin-bottom: 1rem;
  background: #fff;
  box-shadow: 0px 2px 20px -10px #999;
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  line-height: 1;

  .header {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total {
    font-size: 4.5rem;
    
    color: ${props => props.theme.mainThemeColor};
    @media (max-width: 576px) {
      font-size: ${props => 4.5 / 100 * (100 - props.totalAmountLength * 3)}rem;
    }
  }

  .link {
    cursor: pointer;
    background: ${props => props.theme.mainThemeColor};
    padding: 3rem;
    border-radius: 50%; 
    position: relative;
    & span {
      color: #fff;
      font-size: 4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .today {
    font-size: 1.6rem;
    font-weight: 400;
  }
`

export default TotalBox