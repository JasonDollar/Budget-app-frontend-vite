import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import formatMoney from '../lib/formatMoney'

import { selectUserSettings } from '../store/selectors/user'
import { IExpense } from '../interfaces/expense'
import { RootState } from '../store'
import { IUserSettings } from '../interfaces/user'

const ListItem = styled.li`
  /* margin: 1rem 0; */
  border-radius: 1rem;

  background: #fff;
  box-shadow: ${props => props.theme.boxShadow} transparent;
  transition: box-shadow 0.1s ease-in-out;
  
  &:hover {
    @media (min-width: 576px) {
      /* box-shadow: ${props => props.theme.boxShadow} ${props => props.theme.boxShadowColor}; */
    }
  }

  .expenseLink {
    display: block;
    padding: .3rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .expense {
    margin: 0;
    font-size: 3.0rem;
    font-weight: normal;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .amount {
    color: ${props => props.theme.mainThemeColor};
    font-size: 2rem;
  }

  .date {
    font-size: 1.2rem;
    color: ${props => props.theme.textGreyColor};
  }
`

interface Props {
  expense: IExpense
}

const ExpenseListItem: React.FC<Props> = ({ expense }) => {
  const { currency, locale } = useSelector<RootState, IUserSettings>(selectUserSettings)
  // console.log('ex list item rend')
  return (
    <ListItem>
      <Link to={`/expenses/${expense._id}`} className="expenseLink">
        <h2 className="expense">{expense.title}</h2>
        <div className="details">
          <p className="amount">{formatMoney(expense.amount, currency, locale)}</p>
          <p className="date">{expense.expenseDate && format(new Date(expense.expenseDate), 'd LLL')}</p>
        </div>
      </Link>
    </ListItem>
  )
}

export default memo(ExpenseListItem)
