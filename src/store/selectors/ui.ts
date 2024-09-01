import { createSelector } from 'reselect'
import { RootState } from '..'
import { IApiCallState } from '../../interfaces/ui'

const selectUi = (state: RootState) => state.ui

const selectApiCalls = createSelector(
  [selectUi],
  state => state.apiCalls
)

export const selectSingleApiCall = (eventName: string) => createSelector(
  [selectApiCalls],
  apiCalls => apiCalls.find((item: IApiCallState) => item.name === eventName)
)

export const selectFilters = createSelector(
  [selectUi],
  state => state.filter
)

export const selectNotifications = createSelector(
  [selectUi],
  state => state.notifications
)
