import { EActionTypes } from '../actions/actionTypes'
import { TAction  } from '../actions/interface'
import { IFilter, IApiCallState, INotification } from '../../interfaces/ui'
import { apiCallsNames as api } from '../../config/config'

export interface IUiState {
  apiCalls: IApiCallState[]
  notifications: INotification[]
  filter: IFilter
}

const initialState: IUiState = {
  apiCalls: [
    { name: api.saveNewExpense, loading: false, error: {} },
    { name: api.saveEditExpense, loading: false, error: {} },
    { name: api.removeExpense, loading: false, error: {} },
    { name: api.saveCurrency, loading: false, error: {} },
    { name: api.removeCategory, loading: false, error: {} },
    { name: api.fetchExpenses, loading: false, error: {} },
    { name: api.fetchUser, loading: false, error: {} },
    { name: api.loginUser, loading: false, error: {} },
    { name: api.registerUser, loading: false, error: {} },
    { name: api.resetPassword, loading: false, error: {} },
  ],
  filter: {
    search: '',
    dateRangeStart: '',
    dateRangeEnd: '',
    sortBy: 'DATE',
    sortDirection: 'ASC',
    category: ''
  },
  notifications: []
}

const uiReducer = (state: IUiState = initialState, action: TAction) => {
  switch(action.type) {
    case EActionTypes.API_CALL_START:
      return {
        ...state,
        apiCalls: state.apiCalls.map(item => {
          if (item.name !== action.payload.name) { return item }
          return {
            ...item,
            loading: true,
            successMessage: '',
            error: ''
          }
        })
      }
    case EActionTypes.CLEAR_API_CALL:
      return {
        ...state,
        apiCalls: state.apiCalls.map(item => {
          if (item.name !== action.payload.name) { return item }
          return {
            ...item,
            loading: false,
            successMessage: '',
            error: ''
          }
        })
      }
    case EActionTypes.API_CALL_FINISH_SUCCESS:
      return {
        ...state,
        apiCalls: state.apiCalls.map(item => {
          if (item.name !== action.payload.name) { return item }
          return {
            ...item,
            name: action.payload.name,
            loading: false,
            successMessage: action.payload.successMessage,
            error: ''
          }
        })
      }
    case EActionTypes.API_CALL_FINISH_FAIL:
      return {
        ...state,
        apiCalls: state.apiCalls.map(item => {
          if (item.name !== action.payload.name) { return item }
          return {
            ...item,
            name: action.payload.name,
            loading: false,
            successMessage: '',
            error: {
              message: action.payload.error?.message,
              errorData: action.payload.error?.response?.data
            }
          }
        })
      }
    case EActionTypes.UPDATE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      }
    case EActionTypes.ADD_NOTIFICATION: 
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case EActionTypes.REMOVE_NOTIFICATION: 
      return {
        ...state,
        notifications: state.notifications.filter(item => item.id !== action.payload )
      }
    default:
      return state
  }
}

export default uiReducer