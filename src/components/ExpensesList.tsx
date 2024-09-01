import React from 'react'
import { useSelector } from 'react-redux'
import { apiCallsNames as api } from '../config/config'

import { selectAllExpenses } from '../store/selectors/expenses'
import { selectSingleApiCall } from '../store/selectors/ui'

import ExpenseListItem from './ExpenseListItem'
import Loading from './styles/Loading'
import ErrorMessage from './ErrorMessage'
import List from './styles/List'
import { RootState } from '../store'
import { IExpense } from '../interfaces/expense'
import { IApiCallState } from '../interfaces/ui'

const ExpensesList = () => {
  const expenses = useSelector<RootState, IExpense[]>(selectAllExpenses)
  const expensesApi = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.fetchExpenses)(state))

  if (expensesApi.loading) {
    return <Loading />
  }
  
  return (
    <div>
      <List>
        {expenses?.map(item => (
          <ExpenseListItem key={item._id} expense={item}/>
        ))}
      </List>
      {expensesApi.error && <ErrorMessage error={expensesApi.error} />}
    </div>
  )
}

export default ExpensesList
