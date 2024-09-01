import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectFilters } from '../store/selectors/ui'
import { updateFilter } from '../store/actions/ui'
import { selectUserCategories } from '../store/selectors/user'
import { IFilter } from '../interfaces/ui'
import { RootState } from '../store' 
import { Button } from './styles/Button'

const Filter = () => {
  const { search, category, dateRangeStart, dateRangeEnd, sortBy, sortDirection } = useSelector<RootState, IFilter>(selectFilters)
  const categories = useSelector<RootState, string[] | undefined>(selectUserCategories)
  const dispatch = useDispatch()

  const handleChange = (update: Partial<IFilter>) => {
    dispatch(updateFilter(update))
  }

  const toggleSortDirection = (currentDirection: string): 'ASC' | 'DESC' => {
    if (currentDirection === 'ASC') return 'DESC'
    return 'ASC'
  }

  return (
    <div className="margin-r-l">
      Search: <input type="text" value={search} onChange={e => handleChange({search: e.target.value})}/>

      <select value={category} onChange={e => handleChange({ category: e.target.value })}>
        <option value="">All categories</option>
        {categories?.map((item: {    _id: string,categoryName: string,categoryColor: string,categoryIcon: string}) => (
          <option key={item._id} value={item.categoryName}>{item.categoryName}</option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => {
          if (!e.target.value) return
          handleChange({ sortBy: e.target.value as 'DATE' | 'AMOUNT'})
      }}>
        <option value="DATE">Date</option>
        <option value="AMOUNT">Amount</option>
      </select>

      <Button onClick={() => handleChange({sortDirection: toggleSortDirection(sortDirection)})}>{sortDirection}</Button>
    </div>
  )
}

export default Filter
