import { createSelector } from 'reselect'
import { selectFilters } from './ui'

import expenseFilter from '../../lib/expenseFilter'
import { RootState } from '..'

const selectExpenses = (state: RootState) => state.expenses

export const selectAllExpenses = createSelector(
  [selectExpenses, selectFilters],
  (state, filters) => expenseFilter(state.expenses, filters)
)


export const selectSingleExpense = (id: string) => createSelector(
  [selectAllExpenses],
  expenses => (expenses ? expenses.find(item => item._id === id) : null),
)