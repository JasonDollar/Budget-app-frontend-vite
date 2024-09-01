// import { useState } from 'react'
import { useSelector } from "react-redux"
import { selectUserId } from '../store/selectors/user'

export const useIsUserLogged = () => {
  const id = useSelector(selectUserId)

  return !!id
}