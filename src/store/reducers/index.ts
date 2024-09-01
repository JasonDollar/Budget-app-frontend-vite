import {combineReducers} from 'redux'
import expenseReducer, { IExpenseState } from './expenses'
import userReducer, { IUserState } from './user'
import uiReducer, { IUiState } from './ui'

const rootReducer = combineReducers<{
  expenses: IExpenseState,
  user: IUserState,
  ui: IUiState | any
}>({
  expenses: expenseReducer,
  user: userReducer,
  ui: uiReducer,
})

export default rootReducer

export type TRootState = ReturnType<typeof rootReducer>