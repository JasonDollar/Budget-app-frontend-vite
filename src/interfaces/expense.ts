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
  __v?: number
}