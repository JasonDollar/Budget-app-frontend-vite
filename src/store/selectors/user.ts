import { createSelector } from 'reselect'
import { RootState } from '..'

const selectUser = (state: RootState) => state.user

export const selectUserData = createSelector(
  [selectUser],
  state => state.userData
)

export const selectUserSettings = createSelector(
  [selectUserData],
  state => state.settings
)

export const selectUserCategories = createSelector(
  [selectUserData],
  state => state.categories
)

export const selectUserId = createSelector(
  [selectUserData],
  state => state._id
)