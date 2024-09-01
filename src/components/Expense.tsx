import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'date-fns'

import { removeExpense } from '../store/actions/expenses'
import { selectUserCategories, selectUserSettings } from '../store/selectors/user'
import { selectSingleExpense } from '../store/selectors/expenses'
import { selectSingleApiCall } from '../store/selectors/ui'
import formatMoney from '../lib/formatMoney'
import { apiCallsNames as api } from '../config/config'

import Loading from './styles/Loading'
import { BigButton, ButtonsContainer } from './styles/BigButton'
import ErrorMessage from './ErrorMessage'

import { RootState } from '../store' 
import { IApiCallState } from '../interfaces/ui'
import { IExpense } from '../interfaces/expense'
import { IUserSettings } from '../interfaces/user'

const ExpenseContainer = styled.div`
  .title {
    /* text-align: center; */
  }
  p {
    margin: .5rem 0;
  }
`

interface Props {
  expenseId: string
}

const Expense: React.FC<Props> = ({ expenseId }) => {
  const history = useHistory()
  const { loading, error } = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.removeExpense)(state))
  const expense = useSelector<RootState, IExpense | null | undefined>(state => selectSingleExpense(expenseId)(state))
  const { currency, locale } = useSelector<RootState, IUserSettings>(selectUserSettings)
  const categories = useSelector<RootState, { _id: string
    categoryName: string
    categoryColor: string
    categoryIcon: string}[] | undefined>(selectUserCategories)
  const dispatch = useDispatch()

  const removeExpenseHandler = () => {
    dispatch(removeExpense(expenseId, api.removeExpense, history, 'Expense deleted'))
  }
  
  if (!expense || !currency) {
    return (
      <Loading />
    )
  }
  const expenseCategory = categories?.find(item => item.categoryName === expense.category)

  return (
    <ExpenseContainer className="margin-r-l">
      <h2 className="title">{expense.title}</h2>
      <p>Amount: {formatMoney(expense.amount, currency, locale)}</p>
      <p>Date: {format(new Date(expense.expenseDate), 'd LLL')}</p>
      <p style={{ backgroundColor: expenseCategory?.categoryColor }}>Category: {expense.category}</p>
      <p>{expense?.description}</p>
      <ButtonsContainer buttons={2}>
        <BigButton alert fontSize={1.2} >
          <Link to={`/expenses/edit/${expenseId}`}>
            Edit
          </Link>
        </BigButton>
        <BigButton onClick={removeExpenseHandler} danger fontSize={1.2} disabled={loading}>
          Delete
        </BigButton>
      </ButtonsContainer>
      {loading && <span>Removing</span>}
      {error && <ErrorMessage error={error} />}
    </ExpenseContainer>
  )
}

export default Expense
