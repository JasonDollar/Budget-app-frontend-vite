import { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useIsUserLogged } from '../hooks/useIsUserLogged'
import { apiCallsNames as api } from '../config/config'
import AuthForm from './styles/AuthForm'
import { registerUser } from '../store/actions/user'
import { RootState } from '../store'
import { IApiCallState } from '../interfaces/ui'
import { selectSingleApiCall } from '../store/selectors/ui'
import { clearApiCall } from '../store/actions/ui'

const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { loading, error } = useSelector<RootState, IApiCallState>(state => selectSingleApiCall(api.registerUser)(state))
  // LOGIN_USER
  const userLogged = useIsUserLogged()

  useEffect(() => {
    return () => { dispatch(clearApiCall(api.registerUser)) }
  }, [])

  const formSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return
    }
    dispatch(registerUser(name, email, password, passwordConfirm, history))
  }

  if (userLogged) {
    return <Redirect to="/expenses" />
  } else {
    return (
      <AuthForm>
          <form onSubmit={formSubmitHandler} className="form">

          <h1 className="form__name">Register</h1>

          <div className="inputGroup">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={e => setName(e.target.value)} value={name}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="passwordConf">Password</label>
          <input type="password" id="passwordConf" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm}/>
          </div>
          {error && <span className="errorMessage">{error?.message}</span>}
          <button type="submit" className="form__button" disabled={loading}>Register</button>
          <div className="form__link--container">
            <Link to="/login" className="form__link">User already? Log in</Link>
</div>
          </form>
      </AuthForm>
    )
  }
}

export default Register
