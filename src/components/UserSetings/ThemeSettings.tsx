import React from 'react'
import styled from 'styled-components'

const ThemeColor = styled.div<{chosenColor: boolean, backColor: string}>`
  flex: 1;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .themeName {
    margin-top: .5rem;
    color: ${props => props.theme.textColor}
  }
  .colorCircle {
    .outer {
      background: #fff;
      border: 1px solid ${props => props.chosenColor ? props.backColor : '#fff'};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
    }
    .inner {
      padding: 1rem;
      display: block;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      background-color: ${props => props.backColor};
    }
  }
`


interface Props {
  changeAppTheme: (themeId: string) => void
  themeId: string
  themes: { 
    id: string 
    name: string 
    mainColor: string 
  }[]
}

const ThemeSettings: React.FC<Props> = ({ themes, themeId, changeAppTheme }) => {
  return (
    <>
      {themes?.map(item => {
        return (
          <ThemeColor 
            key={item.id} 
            className="theme" 
            onClick={() => changeAppTheme(item.id)} 
            backColor={item.mainColor} 
            chosenColor={themeId === item.id}
          >
            <div className="colorCircle" >
              <div className="outer">
                <div className="inner" />
              </div>
            </div>
            <span className="themeName">{item.name}</span>
          </ThemeColor>
        )
      })}
    </>
  )
}

export default ThemeSettings
