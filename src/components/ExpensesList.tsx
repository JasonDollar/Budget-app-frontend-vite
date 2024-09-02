import ExpenseListItem from './ExpenseListItem'

import List from './styles/List'
import { IExpense } from '../interfaces/expense'

const ExpensesList =  ({ expenses }: IExpense[] ) => {

  
  return (
    <div>
      <List>
        {expenses?.map(item => (
          <ExpenseListItem key={item._id} expense={item}/>
        ))}
      </List>
      {/* {expensesApi.error && <ErrorMessage error={expensesApi.error} />} */}
    </div>
  )
}

export default ExpensesList
