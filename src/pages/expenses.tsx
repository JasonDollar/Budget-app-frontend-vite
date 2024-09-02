import React from 'react'
import Filter from '../components/Filter'
import PageName from '../components/styles/PageName'
import ExpensesMonthGroups from '../components/ExpensesMonthGroups'

const ExpensesPage = () => {
  return (
    <div>
      <PageName className="margin-r-l">Expenses</PageName>
      <Filter />
      <ExpensesMonthGroups />
    </div>
  )
}

export default ExpensesPage
