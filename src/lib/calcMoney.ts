import { isToday } from 'date-fns'
import { IExpense } from '../interfaces/expense'

export const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((acc, item) => {
  return acc += item.amount
}, 0)

export const calculateTodayExpenses = (expenses: IExpense[]): number => expenses.reduce((acc, item) => {
  if (isToday(new Date(item.expenseDate))) {
    return acc += item.amount
  }
  return acc
}, 0)