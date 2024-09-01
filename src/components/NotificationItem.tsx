import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { dismissNotification } from '../store/actions/ui'

const ItemDiv = styled.div<{width: number}>`
  font-size: 1.8rem;
  position: relative;
  border: 1px solid rgba(200,200,200, .6);
  border-radius: 7px;
  margin-bottom: 3px;
  box-shadow: ${props => props.theme.boxShadow};
  overflow: hidden;
  display: flex;
  align-items: center;
  background: ${props => props.theme.backgroundColor};
  padding: 1rem 1.5rem;
  
  span {
    display: block;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: ${props => props.width}%;
    height: 3px;
    background: ${props => props.theme.mainThemeColor};
  }
  button {
    border: none;
    background: none;
  }
`
interface Props {
  message: string
  notificationId: string
}

const NotificationItem: React.FC<Props> = ({ message, notificationId }) => {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(100)
  useEffect(() => {
    const timer = setInterval(() => {
      setWidth(state => state - 1)
    }, 40)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <ItemDiv width={width}>
      <span>{message}</span>
      <button onClick={() => dispatch(dismissNotification(notificationId))}>X</button>
    </ItemDiv>
  )
}

export default NotificationItem
