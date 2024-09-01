import { EActionTypes } from '../actions/actionTypes'
import { TAction  } from '../actions/interface'
import { IUserData } from '../../interfaces/user'

const initialState = {
  userData: {
    settings: {
      currency: 'USD',
      locale: 'en-US'
    }
  }
}

export interface IUserState {
  userData: IUserData
}

const userReducer = (state: IUserState = initialState, action: TAction) => {
  switch(action.type) {
    case EActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    case EActionTypes.CLEAR_USER:
      return initialState
    case EActionTypes.CHANGE_CURRENCY:
      return {
        ...state,
        userData: {
          ...state.userData,
          settings: action.payload
        }
      }
    case EActionTypes.CHANGE_CATEGORIES:
      return {
        ...state,
        userData: {
          ...state.userData,
          categories: action.payload
        }
      }
    default:
      return state
  }
}

export default userReducer