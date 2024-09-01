import { TAction } from './interface'
import { EActionTypes } from './actionTypes'
import { Dispatch } from 'redux'

export const apiCallStart = (name: string): TAction => ({
  type: EActionTypes.API_CALL_START,
  payload : { name }
})

export const apiCallFinishSuccess = (name: string, message?: string): TAction => ({
  type: EActionTypes.API_CALL_FINISH_SUCCESS,
  payload : { name, successMessage: message }
})

export const apiCallFinishFail = (name: string, error: any): TAction => ({
  type: EActionTypes.API_CALL_FINISH_FAIL,
  payload : { name, error }
})

export const clearApiCall = (name: string): TAction => ({
  type: EActionTypes.CLEAR_API_CALL,
  payload : { name }
})

export const updateFilter = (updates: any): TAction => ({
  type: EActionTypes.UPDATE_FILTER,
  payload: updates
})

const addNotification = ({ id, message }: { id: string, message: string }): TAction => ({
  type: EActionTypes.ADD_NOTIFICATION,
  payload: { id, message }
})

export const showNotification = (message: string) => (dispatch: Dispatch<TAction>) => {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  dispatch(addNotification({
      id,
      message
    })
  )
  setTimeout(() => {
    dispatch(dismissNotification(id))
  }, 4000)
}

export const dismissNotification = (id: string): TAction => ({
  type: EActionTypes.REMOVE_NOTIFICATION,
  payload: id
})
