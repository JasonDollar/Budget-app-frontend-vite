import axios from 'axios'
import { TAction } from './interface'
import { EActionTypes } from './actionTypes'
import { Dispatch } from 'redux'
import { IUserData } from '../../interfaces/user'
import { baseUrl, apiCallsNames as api } from '../../config/config'
import setAuthToken from '../../lib/setAuthToken'

import { setExpenses, clearExpenses } from './expenses'

import { apiCallStart, apiCallFinishSuccess, apiCallFinishFail, showNotification } from './ui'

export const loadingUserStart = () => ({
  type: EActionTypes.LOADING_USER_START,
})

export const setUserToStore = (userData: IUserData): TAction => {
  return {
    type: EActionTypes.SET_USER_DATA,
    payload: userData
  }
}

export const clearUser = (): TAction => ({
  type: EActionTypes.CLEAR_USER
})

export const changeCurrencyInStore = (newCurrency: string): TAction => ({
  type: EActionTypes.CHANGE_CURRENCY,
  payload: newCurrency
})

export const changeCategoriesInStore = (categories: string): TAction => ({
  type: EActionTypes.CHANGE_CATEGORIES,
  payload: categories
})

export const getUserData = () => async (dispatch: Dispatch<TAction>) => {
  try {
    dispatch(apiCallStart(api.fetchUser))
    const res = await axios.get(`${baseUrl}/users/userDetails`)
    if (res.statusText === 'OK') {
      const { user } = res.data
      dispatch(setUserToStore(user))
      dispatch(apiCallFinishSuccess(api.fetchUser))
    }
  } catch (e) {
    dispatch(apiCallFinishFail(api.fetchUser, e))
  }
}

export const loginUser = (email: string, password: string, history: any) => async (dispatch: Dispatch<TAction | any>) => {
  dispatch(apiCallStart(api.loginUser))
  try {
    const res = await axios.post(`${baseUrl}/users/login`, { email, password })
    if (res.statusText === 'OK') {
      const { userData } = res.data
      const { user, token } = userData
      dispatch(setUserToStore(user))
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      dispatch(apiCallFinishSuccess(api.loginUser))
      dispatch(setExpenses())
      dispatch(showNotification('Logged in succesfully'))
      history.push('/expenses')
    }
  } catch (e) {
    dispatch(apiCallFinishFail(api.loginUser, e))
  }
}

export const registerUser = (name: string, email: string, password: string, passwordConfirm: string, history: any) => async (dispatch: Dispatch<TAction>) => {
  dispatch(apiCallStart(api.registerUser))
  dispatch(clearExpenses())
  try {
    const res = await axios.post(`${baseUrl}/users`, { name, email, password, passwordConfirm })

    if (res.statusText === 'Created') {
      const { userData } = res.data
      const { user, token } = userData
      dispatch(setUserToStore(user))
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      dispatch(apiCallFinishSuccess(api.registerUser))
      history.push('/expenses')
    }
  } catch (e) {
    dispatch(apiCallFinishFail(api.registerUser, e))
  }
}

export const logoutUser = (history?: any) => async (dispatch: Dispatch<TAction>) => {
  dispatch(apiCallStart(api.logoutUser))
  const res = await axios.post(`${baseUrl}/users/logout`)

  if (res.statusText === 'OK') {
    dispatch(clearUser())
    dispatch(clearExpenses())
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(apiCallFinishSuccess(api.logoutUser))
    history.push('/login')
  }
}

export const changeCurrency = (newCurrency: string, uiAction: string) => async (dispatch: Dispatch<TAction | any>) => {
  dispatch(apiCallStart(uiAction))
  try {
    const res = await axios.patch(`${baseUrl}/users/currency`, { newCurrency })
    if (res.statusText === 'OK') {
      const { currency } = res.data
    
      dispatch(changeCurrencyInStore(currency))
      dispatch(apiCallFinishSuccess(uiAction))
      dispatch(showNotification(`Currency changed to ${newCurrency}`))
    }
  } catch (e) {
    dispatch(apiCallFinishFail(uiAction, e))
  }
}

export const removeCategory = (categoryId: string, uiAction: string) => async (dispatch: Dispatch<TAction>) => {
  dispatch(apiCallStart(uiAction))
  try {
    const res = await axios.delete(`${baseUrl}/users/category/${categoryId}`)
    if (res.statusText === 'OK') {
      const { categories } = res.data
      dispatch(changeCategoriesInStore(categories))
      dispatch(apiCallFinishSuccess(uiAction))
    }
  } catch (e: any) {
    console.log(e.response)
    dispatch(apiCallFinishFail(uiAction, e))
  }
}

export const resetUserPassword = (email: string, uiAction: string) => async (dispatch: Dispatch<TAction>) => {
  dispatch(apiCallStart(uiAction))
  try {
    const res = await axios.post(`${baseUrl}/users/resetPassword`, { email })
    if (res.statusText === 'OK') {
      const { message } = res.data

      dispatch(apiCallFinishSuccess(uiAction, message))
    }
  } catch (e: any) {
    // console.log(e.response)
    dispatch(apiCallFinishFail(uiAction, e))
  }
}