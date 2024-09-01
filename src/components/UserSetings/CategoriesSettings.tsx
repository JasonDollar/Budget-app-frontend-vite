import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCategory } from '../../store/actions/user'
import { selectSingleApiCall } from '../../store/selectors/ui'
import { apiCallsNames as api } from '../../config/config'
import styled from 'styled-components'
import ErrorMessage from '../ErrorMessage'
import List from '../styles/List'
import { IApiCallState } from '../../interfaces/ui'
import { RootState } from '../../store'

const ListElement = styled.li`
  &::first-letter {
    text-transform: uppercase;
  }
`

interface Props {
  categories?: {
    _id: string
    categoryName: string
    categoryColor: string
    categoryIcon: string
  }[]
}

const CategoriesSettings: React.FC<Props> = ({ categories }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.removeCategory)(state))

  return (
    <div>
      Your categories:
      <List>
        {categories?.map(item => (
          <ListElement key={item._id} style={{ backgroundColor: item.categoryColor }}>{item.categoryName} <button onClick={() => dispatch(removeCategory(item._id, api.removeCategory))} disabled={loading}>X</button> </ListElement>
        ))}
      </List>
      { loading && <span>Removing</span> }
      {error && <ErrorMessage error={error} />}
    </div>
  )
}

export default CategoriesSettings
