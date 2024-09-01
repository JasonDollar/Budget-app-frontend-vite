import axios from 'axios'
import { Dispatch } from 'redux'
import * as types from './actionTypes'
import { EActionTypes } from './actionTypes'
import { baseUrl, apiCallsNames as api } from '../../config/config'
import { IExpense } from '../../interfaces/expense'
import { TAction } from './interface'

import { apiCallStart, apiCallFinishSuccess, apiCallFinishFail, showNotification } from './ui'

export const loadingExpenseStart = () => ({
  type: types.LOADING_EXPENSE_START,
})

export const setExpensesToStore = (expenses: IExpense[]) : TAction => ({
  type: EActionTypes.SET_EXPENSES,
  payload: expenses
})

export const clearExpenses = (): TAction => ({
  type: EActionTypes.CLEAR_EXPENSES
})

export const setExpenses = () => async (dispatch: Dispatch<TAction>) => {
  try {
    dispatch(apiCallStart(api.fetchExpenses))
    const res = await axios.get(`${baseUrl}/expenses`)
    if (res.statusText === 'OK') {
      const expenses = res.data.expenses
      dispatch(setExpensesToStore(expenses))
      dispatch(apiCallFinishSuccess(api.fetchExpenses))
    }
  } catch (e: any) {
    console.log(e.message)
    dispatch(setExpensesToStore([]))
    dispatch(apiCallFinishFail(api.fetchExpenses, e))
  }
}

export const addExpenseToStore = (expense: IExpense): TAction => ({
  type: EActionTypes.ADD_EXPENSE,
  payload: expense
})

export const addExpense = (expenseData: any, uiAction: string, history: any, notification: string) => async (dispatch: Dispatch<TAction | any>) => {
  dispatch(apiCallStart(uiAction))

  try {
    const res = await axios.post(`${baseUrl}/expenses`, expenseData)
    if (res.statusText === 'Created') {
      const expense = res.data.expense
      dispatch(addExpenseToStore(expense))
      dispatch(apiCallFinishSuccess(uiAction))
      if (notification) { dispatch(showNotification(notification)) }
      history.push('/expenses')
    }
  } catch (e: any) {
    dispatch(apiCallFinishFail(uiAction, e))
    // add error handling
    console.log(e.response)
    console.log(e.message)
  }
}

export const removeExpenseFromStore = (id: string): TAction => ({
  type: EActionTypes.REMOVE_EXPENSE,
  payload: id
})

export const removeExpense = (id: string, uiAction: string, history: any, notification: string) => async (dispatch: Dispatch<TAction | any>) => {
  dispatch(apiCallStart(uiAction))
  try {
    const res = await axios.delete(`${baseUrl}/expenses/${id}`)

    if (res.statusText === 'OK') {
      dispatch(removeExpenseFromStore(id))
      dispatch(apiCallFinishSuccess(uiAction))
      if (notification) { dispatch(showNotification(notification)) }
      history.push('/expenses')
    }
  } catch (e) {
    dispatch(apiCallFinishFail(uiAction, e))
  }
}


export const editExpenseInStore = (expense: IExpense): TAction => ({
  type: EActionTypes.EDIT_EXPENSE,
  payload: expense
})

export const editExpense = (id: string, updates: any, uiAction: string, history: any, notification: string) => async (dispatch: Dispatch<TAction | any>) => {
  dispatch(apiCallStart(uiAction))
  dispatch(loadingExpenseStart())
  try {
    const res = await axios.patch(`${baseUrl}/expenses/${id}`, updates)

    if (res.statusText === 'OK') {
      dispatch(editExpenseInStore(res.data.expense))
      dispatch(apiCallFinishSuccess(uiAction))
      if (notification) { dispatch(showNotification(notification)) }
      history.push('/expenses')
    }
  } catch (e: any) {
    dispatch(apiCallFinishFail(uiAction, e))
  }
}