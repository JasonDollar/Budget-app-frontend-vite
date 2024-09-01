import React from 'react'
import ExpensesList from '../components/ExpensesList'
import Filter from '../components/Filter'
import PageName from '../components/styles/PageName'

const ExpensesPage = () => {
  return (
    <div>
      <PageName className="margin-r-l">Expenses</PageName>
      <Filter />
      <ExpensesList />
    </div>
  )
}

export default ExpensesPage
