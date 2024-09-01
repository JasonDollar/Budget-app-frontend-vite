import { EActionTypes } from './actionTypes'

import { IExpense } from '../../interfaces/expense'

interface ISetExpenses {
  type: EActionTypes.SET_EXPENSES,
  payload: IExpense[]
}

interface IAddExpenses {
  type: EActionTypes.ADD_EXPENSE,
  payload: IExpense
}

interface IAddNotification {
  type: EActionTypes.ADD_NOTIFICATION,
  payload: {
    id: string,
    message: string
  }
}

interface IDismissNotification {
  type: EActionTypes.REMOVE_NOTIFICATION,
  payload: string
}

interface IApiCallStart {
  type: EActionTypes.API_CALL_START,
  payload: { name: string }
}

interface IApiCallFinishSuccess {
  type: EActionTypes.API_CALL_FINISH_SUCCESS,
  payload: { name: string, successMessage?: string }
}

interface IApiCallFinishFail {
  type: EActionTypes.API_CALL_FINISH_FAIL,
  payload: { name: string, error: any }
}

interface IClearApiCall {
  type: EActionTypes.CLEAR_API_CALL,
  payload: { name: string }
}

interface IUpdateFilter {
  type: EActionTypes.UPDATE_FILTER,
  payload: any
}

interface ISetUserToStore {
  type: EActionTypes.SET_USER_DATA,
  payload: any
}

interface IChangeCurrencyInStore {
  type: EActionTypes.CHANGE_CURRENCY,
  payload: any
}

interface IChangeCategoriesInStore {
  type: EActionTypes.CHANGE_CATEGORIES,
  payload: any
}

interface IClearUser {
  type: EActionTypes.CLEAR_USER,
}

interface IClearExpenses {
  type: EActionTypes.CLEAR_EXPENSES,
}

interface IEditExpense {
  type: EActionTypes.EDIT_EXPENSE,
  payload: IExpense
}

interface IRemoveExpense {
  type: EActionTypes.REMOVE_EXPENSE,
  payload: string
}


export type TAction =
  | ISetExpenses
  | IAddExpenses
  | IAddNotification
  | IDismissNotification
  | IApiCallStart
  | IApiCallFinishSuccess
  | IApiCallFinishFail
  | IUpdateFilter
  | ISetUserToStore
  | IChangeCurrencyInStore
  | IChangeCategoriesInStore
  | IClearUser
  | IClearExpenses
  | IEditExpense
  | IRemoveExpense
  | IClearApiCall