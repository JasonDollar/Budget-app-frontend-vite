import { isAfter, isBefore } from 'date-fns'
import { IExpense } from '../interfaces/expense'
import { IFilter } from '../interfaces/ui'


const expenseFilter = (expenses: IExpense[], { search, category, dateRangeStart, dateRangeEnd, sortBy, sortDirection }: IFilter) => {
  return expenses.filter(item => {
    const expenseDate = new Date(item.expenseDate)
    const textMatch = item.title.toLowerCase().includes(search.toLowerCase()) || (
      item.description && item.description.toLowerCase().includes(search.toLowerCase())
      )
    const categoryMatch = category ? item.category.toLowerCase() === category.toLowerCase() : true

    let dateMatchStart = true, dateMatchEnd = true
    if (dateRangeStart) {
      dateMatchStart = isAfter(expenseDate, new Date(dateRangeStart))
    }
    if (dateRangeEnd) {
      dateMatchEnd = isBefore(expenseDate, new Date(dateRangeEnd))
    }
    return textMatch && dateMatchStart && dateMatchEnd && categoryMatch
  })
  .sort((a, b) => {
    if (sortBy === 'DATE') {
      if (a.expenseDate === b.expenseDate) return 0
      let sortExpression = a.expenseDate < b.expenseDate
      if (sortDirection === 'ASC') {
        sortExpression = a.expenseDate > b.expenseDate
      } else if (sortDirection === 'DESC') {
        sortExpression = a.expenseDate < b.expenseDate
      }
      return sortExpression ? 1 : -1
    }

    if (sortBy === 'AMOUNT') {
      if (a.amount === b.amount) return 0
      let sortExpression = a.amount < b.amount
      if (sortDirection === 'ASC') {
        sortExpression = a.amount > b.amount
      } else if (sortDirection === 'DESC') {
        sortExpression = a.amount < b.amount
      }
      return sortExpression ? 1 : -1
    }
    // it should never reach it
    return 0
  })
}

export default expenseFilter