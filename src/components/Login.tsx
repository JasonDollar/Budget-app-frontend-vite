import { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useIsUserLogged } from '../hooks/useIsUserLogged'
import { apiCallsNames as api } from '../config/config'
import AuthForm from './styles/AuthForm'
import { loginUser } from '../store/actions/user'
import { selectSingleApiCall } from '../store/selectors/ui'
import { RootState } from '../store'
import { IApiCallState } from '../interfaces/ui'
import { clearApiCall } from '../store/actions/ui'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.loginUser)(state))

  const userLogged = useIsUserLogged()

  useEffect(() => {
    return () => { dispatch(clearApiCall(api.loginUser)) }
  }, [])
  
  const previewAccountHandler = () => {
    setEmail('qwe@qwe.qwe')
    setPassword('qweqweqwe')
  }

  const formSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(email, password, history))
  }

  if (userLogged) {
    return <Redirect to="/expenses" />
  } else {
    return (
      <AuthForm>
          <form onSubmit={formSubmitHandler} className="form">

            <h1 className="form__name">Login</h1>

            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            {error && <span className="errorMessage">{error?.errorData?.message ? error?.errorData?.message : error?.message}</span>}

            <button type="submit" className="form__button">Login</button>
            <div className="form__link--container">
              <button className="testAccount" type="button" onClick={previewAccountHandler} disabled={loading}>Use Preview Account</button>
              <Link to="/register" className="form__link">New User? Create an account</Link>
              <Link to="/resetPassword" className="form__link">Forgot your password?</Link>
            </div>
          </form>
      </AuthForm>
    )
  }
}

export default Login
