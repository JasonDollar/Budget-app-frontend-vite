export interface IExpense {
  _id: string,
  title: string,
  amount: number,
  description?: string,
  owner: string,
  createdAt: Date | string,
  updatedAt: Date | string,
  expenseDate: Date | string,
  category: string,
  expenseDateGroup?: string
  __v?: number
}

export interface IExpenseGroup {
  _id?: string,
  expenseDateGroupDate: string,
  expenseDateGroupId: string,
  count: number,
  sumAmount: number,
  expenses: IExpense[]
}