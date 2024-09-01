import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { ThemeProvider } from 'styled-components'


import { setExpenses, clearExpenses } from './store/actions/expenses'
import { clearUser, getUserData } from './store/actions/user'
import setAuthToken from './lib/setAuthToken'

import Register from './pages/register'
import Login from './pages/login'
import AddExpense from './pages/addExpense'
import EditExpense from './pages/editExpense'
import Expenses from './pages/expenses'
import Expense from './pages/expense'
import User from './pages/user'
import ResetPassword from './pages/resetPassword'
import Notifications from './components/Notifications'

import { GlobalStyle } from './components/styles/globalStyles'
import { getTheme } from './components/styles/theme'
import Header from './components/Header'
import Total from './components/Total'
import { selectNotifications } from './store/selectors/ui'
import { useIsUserLogged } from './hooks/useIsUserLogged'
// import { selectUserData } from './store/selectors/user'
// import { showNotification } from './store/actions/ui'

function App() {
  const [totalComponentHeight, setTotalComponentHeight] = useState(0)
  const [firstLoading, setFirstLoading] = useState(true)
  const history = useHistory()
  const notifications = useSelector(selectNotifications)
  const userLogged = useIsUserLogged()
  const dispatch = useDispatch()

  const [themeId, changeThemeId] = useState(() => {
    const themeIdFromLS = localStorage.getItem('theme')
    if (themeIdFromLS) return themeIdFromLS
    return 'violet'
  })
  
  useEffect(() => {
    getJwtFromLS()
  }, [])

  console.log(userLogged)
  useEffect(() => {
    if (!userLogged) {
      setTotalComponentHeight(0)
    }
  }, [userLogged])

  
  const getJwtFromLS = () => {
    const token = localStorage.getItem('jwtToken')
    // console.log(token)
    if (token) {
      const decoded = jwtDecode(token)
      console.log(decoded)
      setAuthToken(token)
      dispatch(setExpenses())
      dispatch(getUserData())
      setFirstLoading(false)
      // setUserExists(true)
    } else {
      dispatch(clearUser())
      dispatch(clearExpenses())
      // setUserExists(false)
    }
  }

  const changeAppTheme = (themeId: string) => {
    localStorage.setItem('theme', themeId)
    changeThemeId(themeId)
  }

  const setTotalComponentHeightFunc = (height?: number) => {
    if (!height) return 
    setTotalComponentHeight(height)
  }
  return (
    
      <ThemeProvider theme={() => getTheme(themeId)} >
        <GlobalStyle />

          <Header totalComponentHeight={totalComponentHeight}/>
          <div className="desktopContainer">
          <Switch>
            {!userLogged ? (
              <>
                <Route path="/register" exact>
                  <Register />
                </Route>

                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/resetPassword" exact>
                  <ResetPassword />
                </Route>
                <Route path="/">
                  <Redirect to="/login" />
                  {/* maybe add landing page in the future? */}
                </Route>
              </>
            ) : (
              null
            )}

            <Route path="/">
              {/* redirect to expenses page immediately */}
              {userLogged ? (
                <>
                  <Total totalComponentHeight={totalComponentHeight} setTotalComponentHeight={setTotalComponentHeightFunc}/>
                  <Switch>

                  <Route path="/user" >
                    <User changeAppTheme={changeAppTheme} themeId={themeId} />
                  </Route>
                  <Route path="/addExpense" exact>
                    <AddExpense/>
                  </Route>
                  <Route path="/expenses/:expenseId" exact>
                    <Expense />
                  </Route>
                  <Route path="/expenses/edit/:expenseId" exact>
                    <EditExpense />
                  </Route>
                  <Route path="/expenses" exact>
                    <Expenses />
                  </Route>
                  <Route path="/">
                    <Redirect to="expenses" />
                  </Route>
                </Switch>
                </>
              ) : <Redirect to="/register" />}

            
            </Route>
          </Switch>
          {/* <button onClick={e => dispatch(showNotification('message'))}>Add</button> */}
          {notifications && <Notifications notifications={notifications} />}
          </div> 

      </ThemeProvider>

  );
}

export default App;

