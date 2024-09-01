import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { availableCurrencies, apiCallsNames as api } from '../../config/config'
import { IApiCallState } from '../../interfaces/ui'
import { RootState } from '../../store'

import { changeCurrency } from '../../store/actions/user'
import { selectSingleApiCall } from '../../store/selectors/ui'
import ErrorMessage from '../ErrorMessage'
import { Button } from '../styles/Button'

interface Props {
  userCurrency: string
}

const CurrencySettings: React.FC<Props> = ({ userCurrency }) => {
  const [currency, setCurrency] = useState('')
  const dispatch = useDispatch()
  const saveCurrencyApiState = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.saveCurrency)(state))

  const changeCurrencyHandler = () => {
    if (!currency) { return }
    dispatch(changeCurrency(currency, api.saveCurrency))
  }
  
  return (
    <div>
      <label htmlFor="currency">Choose currency:</label>
      <select name="currency" id="currency" value={currency} onChange={e => setCurrency(e.target.value)} >
        <option value="">Choose currency</option>
        {availableCurrencies.map(item => (
          <option key={item} value={item} >{item}</option>
        ))}
      </select>
      <Button disabled={userCurrency === currency || !currency || saveCurrencyApiState.loading} onClick={changeCurrencyHandler}>Save</Button>
      {saveCurrencyApiState.loading && <p>Saving</p>}
      {saveCurrencyApiState.error && <ErrorMessage error={saveCurrencyApiState.error} />}
    </div>
  )
}

export default CurrencySettings
