import { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useIsUserLogged } from '../hooks/useIsUserLogged'
import { apiCallsNames as api } from '../config/config'
import AuthForm from './styles/AuthForm'
import { resetUserPassword } from '../store/actions/user'
import { selectSingleApiCall } from '../store/selectors/ui'
import { RootState } from '../store'
import { IApiCallState } from '../interfaces/ui'
import { clearApiCall } from '../store/actions/ui'
import { isEmail } from '../lib/isEmail'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, successMessage } = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.resetPassword)(state))
  // console.log(error)
  const userLogged = useIsUserLogged()

  useEffect(() => {
    return () => { dispatch(clearApiCall(api.resetPassword)) }
  }, [])

  const formSubmitResetHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userEmailIsValid = isEmail(email)

    if (!userEmailIsValid) {
      return
    }
    dispatch(resetUserPassword(email, api.resetPassword))
  }

  if (userLogged) {
    return <Redirect to="/expenses" />
  } else {
    return (
      <AuthForm>
          <form onSubmit={formSubmitResetHandler} className="form">

          <h1 className="form__name">Reset Password</h1>

          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </div> 


          <button type="submit" className="form__button">Reset</button>
            {error && <span className="errorMessage">{error?.errorData?.message ? error?.errorData?.message : error?.message}</span>}
            {successMessage && <span className="successMessage">{successMessage}</span>}
          </form>
      </AuthForm>
    )
  }
}

export default ResetPassword
