import React from 'react'
import styled from 'styled-components'
import { INotification } from '../interfaces/ui'
import NotificationItem from './NotificationItem'

const NotificationBox = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  @media (min-width: 768px) {
    left: 3rem;
    bottom: 2rem;
  }
`

interface Props {
  notifications: INotification[]
}

const Notifications: React.FC<Props> = ({ notifications }) => {
  return (
    <NotificationBox>
      {notifications.map(item => (
        <NotificationItem key={item.id} notificationId={item.id} message={item.message}/>
      ))}
    </NotificationBox>
  )
}

export default Notifications
