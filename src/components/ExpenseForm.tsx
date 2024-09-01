import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-date-picker'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserCategories } from '../store/selectors/user'

import { BigButton, ButtonsContainer } from './styles/BigButton'
import ErrorMessage from './ErrorMessage'

import { IApiCallState } from '../interfaces/ui'

const FormContainer = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    >* {
      margin-bottom: 2rem;
    }
  }

  .text-input,
  .textarea {
    border: 1px solid #cacccd;
    height: 50px;
    font-size: 1.8rem;
    font-family: inherit;
    font-weight: 300;
    padding: 1rem;
  }

  .textarea {
    height: 10rem;
  }
`

interface Props {
  expenseId?: string
  titleExpense?: string
  descriptionExpense?: string
  amountExpense?: number | string
  handleSubmit: (title: string, description: string, amount: number, date: Date | string, category: string) => Promise<void>
  dateExpense?: Date | string
  categoryExpense?: string
  apiCallState: IApiCallState
}

const ExpenseForm: React.FC<Props> = ({ 
  expenseId, 
  titleExpense = '', 
  descriptionExpense = '', 
  amountExpense = '', 
  handleSubmit, 
  dateExpense, 
  categoryExpense , 
  apiCallState 
}) => {
  
  const categories = useSelector(selectUserCategories)
  const [title, setTitle] = useState(titleExpense)
  const [description, setDescription] = useState(descriptionExpense)
  const [amount, setAmount] = useState(amountExpense && +amountExpense / 100)
  const [expenseDate, setExpenseDate] = useState(dateExpense ? new Date(dateExpense) : new Date())
  const [category, setCategory] = useState('')
  console.log(categories)
  useEffect(() => {
    if (categoryExpense) {
      setCategory(categoryExpense)
    } else if (categories?.length) {
      setCategory(categories[0].categoryName)
    } else {
      setCategory('other')
    }
  }, [categories, categoryExpense])

  const formHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // simple validation
    if (!title || (amount && amount <= 0) || !amount) return

    await handleSubmit(title, description, amount, expenseDate, category)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.toLowerCase() === 'e') return
    const parsedAmount = Math.floor(Number(e.target.value) * 100) / 100

    const newAmount = parsedAmount > 0 ? parsedAmount : ''

    setAmount(newAmount)
  }

  return (
    <FormContainer>
      <form onSubmit={formHandler} className="form">
        <input 
          className="text-input" 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required
        />
        <input 
          className="text-input" 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => handleAmountChange(e)} 
          step="0.01" 
          required
        />
        <div>
          <DatePicker 
            value={expenseDate} 
            onChange={date => setExpenseDate(date as Date)}  
            clearIcon={null}
            minDetail="year"
            required
            format="dd.MM.y"
          />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {/* below turnary is for local mobile testing purposes */}
            {categories?.length ? categories.map((item: {_id: string, categoryName: string}) => (
              <option key={item._id} value={item.categoryName}>{item.categoryName}</option>
            )) : (
                <option value="other">Other</option>
            )}
          </select>
        </div>
        <textarea 
          className="textarea" 
          placeholder="Add a short note to you expense" 
          value={description} 
          onChange={e => setDescription(e.target.value)}
        />
        <ButtonsContainer buttons={2}>
          <BigButton alert>
            <Link to={expenseId ? `/expenses/${expenseId}` : '/expenses'}>
              Cancel
            </Link>
          </BigButton>
          <BigButton type="submit" disabled={apiCallState?.loading}>Save expense</BigButton>
        </ButtonsContainer>
        {apiCallState?.loading && <p>Saving</p>}
        {apiCallState.error && <ErrorMessage error={apiCallState.error} />}
      </form>
    </FormContainer>
  )
}

export default ExpenseForm
