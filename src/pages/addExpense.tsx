import { useHistory } from 'react-router-dom'
import ExpenseForm from '../components/ExpenseForm'

import { useDispatch, useSelector } from 'react-redux'

import { addExpense } from '../store/actions/expenses'
import { selectSingleApiCall } from '../store/selectors/ui'
import { apiCallsNames as api } from '../config/config'
import { RootState } from '../store'
import { IApiCallState } from '../interfaces/ui'
import PageName from '../components/styles/PageName'

const AddExpensePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const saveNewExpenseApiState = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.saveNewExpense)(state))
  const addExpenseHandler = async (title: string, description: string, amount: number, date: Date | string, category: string) => {
    // save expense as whole number
    const validAmount = Math.floor(amount * 100)
    dispatch(addExpense({title, description, amount: validAmount, expenseDate: date, category}, api.saveNewExpense, history, 'Expense added')) 
  }
  
  return (
    <div className="margin-r-l">
      <PageName className="no-margin">Add Expense</PageName>
      <ExpenseForm handleSubmit={addExpenseHandler} apiCallState={saveNewExpenseApiState}/>
    </div>
  )
}

export default AddExpensePage
