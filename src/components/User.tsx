import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/user'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { selectUserData } from '../store/selectors/user'

import UserSettings from './UserSetings/UserSettings'
import { RootState } from '../store'
import { IUserData } from '../interfaces/user'
import { Button } from './styles/Button'

interface Props {
  changeAppTheme: (themeId: string) => void
  themeId: string
}

const UserContainer = styled.div`
  h1 {
    margin: 1rem 0;
  }
` 

const User: React.FC<Props> = ({ changeAppTheme, themeId }) => {
  const user = useSelector<RootState, IUserData>(selectUserData)
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <UserContainer className="margin-r-l">
      <h1>{user.name}</h1>
      <UserSettings changeAppTheme={changeAppTheme} themeId={themeId}/>
      {/* logout below is for testing */}
      <Button onClick={() => dispatch(logoutUser(history))}>Logout</Button>
    </UserContainer>
  )
}

export default User
