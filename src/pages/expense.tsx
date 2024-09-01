import React from 'react'
import { useParams } from 'react-router-dom'
import Expense from '../components/Expense'
import PageName from '../components/styles/PageName'

const ExpensePage = () => {
  const { expenseId } = useParams<{ expenseId: string }>()
  return (
    <div>
      <PageName className="margin-r-l">Expense</PageName>
      <Expense expenseId={expenseId}/>
    </div>
  )
}

export default ExpensePage
