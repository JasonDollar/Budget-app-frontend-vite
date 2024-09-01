import { EActionTypes } from '../actions/actionTypes'
import { TAction  } from '../actions/interface'
import { IExpense } from '../../interfaces/expense'
const initialState = {
  // loading: false,
  // error: '',
  expenses: [
    {
    _id: '603e8a3bc4e77e04d869c708',
    title: 'Pizza',
    amount: 4000,
    description: '123',
    owner: '603d436854bb723cac11917a',
    createdAt: '2021-03-02T18:55:55.542Z',
    updatedAt: '2021-03-02T18:55:55.542Z',
    expenseDate: '2021-03-02T18:55:55.542Z',
    category: 'other',
    __v: 0
  }, {
    _id: '603e8a3bc4e77e04d869c709',
    title: 'Second Pizza',
    amount: 4230,
    description: 'Note',
    owner: '603d436854bb723cac11917a',
    createdAt: '2021-03-12T18:55:55.542Z',
    updatedAt: '2021-03-12T18:55:55.542Z',
    expenseDate: '2021-03-12T18:55:55.542Z',
    category: 'other',
  }
]
}

export interface IExpenseState {
  expenses: IExpense[]
}

const expenseReducer = (state: IExpenseState = initialState, action: TAction): IExpenseState => {
  switch (action.type) {
    case EActionTypes.SET_EXPENSES:
      return {
        expenses: action.payload
      }
    case EActionTypes.ADD_EXPENSE:
      return {
        expenses: [...state.expenses, action.payload]
      }
    case EActionTypes.REMOVE_EXPENSE:
      const filteredExpenses = state.expenses.filter(item => item._id !== action.payload)
      return {
        expenses: filteredExpenses
      }
    case EActionTypes.EDIT_EXPENSE:
      const mappedExpenses = state.expenses.map(item => {
        if (item._id === action.payload._id) {
          return action.payload
        }
        return item
      })
      return {
        expenses: mappedExpenses
      }
    case EActionTypes.CLEAR_EXPENSES:
      return {
        expenses: [],
      }
    default:
      return state
  }
}

export default expenseReducer