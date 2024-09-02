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
import { IExpense, IExpenseGroup } from '../interfaces/expense'
import { IApiCallState } from '../interfaces/ui'
import ExpensesList from './ExpensesList'
import { formatDateToMonth } from '../lib/dates'
import { getMonth, getYear } from 'date-fns'

const ExpensesMonthGroups = () => {
  const expenses = useSelector<RootState, IExpense[]>(selectAllExpenses)
  const expensesApi = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.fetchExpenses)(state))
  // console.log(expenses)
  if (expensesApi.loading) {
    return <Loading />
  }
  const expensesGrouped: { [key: string]: IExpenseGroup } = expenses.reduce((acc, item) => {
    const year = getYear(item.expenseDate)
    const month = getMonth(item.expenseDate)

    const expenseDateGroup = `${year}${month <= 8 ? '0' + (month + 1) : month + 1}`
    if (!acc[expenseDateGroup]) {
      acc[expenseDateGroup] = {
        expenseDateGroupId: expenseDateGroup,
        expenseDateGroupDate: new Date(year, month),
        count: 1,
        sumAmount: item.amount,
        expenses: [item]
      }
      return acc
    }
    acc[expenseDateGroup].expenses.push(item)
    acc[expenseDateGroup].count = acc[expenseDateGroup].count + 1
    acc[expenseDateGroup].sumAmount = acc[expenseDateGroup].sumAmount + item.amount
    return acc
  }, {})
  return (
    <div>
      
        {Object.values(expensesGrouped)?.map(item => (
          <div>
            <h3>{formatDateToMonth(item.expenseDateGroupDate)} / {item.count} / {item.sumAmount / 100}</h3>
            <ExpensesList key={item.expenseDateGroupId} expenses={item.expenses}/>
          </div>
        ))}
    </div>
  )
}

export default ExpensesMonthGroups