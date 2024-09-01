import React from 'react'
import { NavLink } from 'react-router-dom'
import { useIsUserLogged } from '../hooks/useIsUserLogged'

import { NavList, Backdrop } from './styles/Nav'

interface Props {
  isOpen: boolean
  toggleNavOpen: () => void
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const Nav: React.FC<Props> = ({ isOpen, toggleNavOpen, handleLinkClick }) => {
  const userLogged = useIsUserLogged()

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={toggleNavOpen}/>
      <NavList className={isOpen ? 'open' : ''} >
        <li className="onlyMobile">
          <button onClick={toggleNavOpen} className="closeMenu">Close</button>
        </li>
        {userLogged ? (
          <>
            <li>
              <NavLink to="/" onClick={handleLinkClick}>Expenses</NavLink>
            </li>
            <li>
              <NavLink to="/user" onClick={handleLinkClick}>User</NavLink>
            </li>
          </>

        ) : null}
        {!userLogged ? (
          <>
            <li>
              <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={handleLinkClick}>Register</NavLink>
            </li>
          </>

        ) : null}
        {/* <li>
          <NavLink to="/">Menu item 2</NavLink>
        </li>
        <li>
          <NavLink to="/">Menu item 3</NavLink>
        </li>
        <li>
          <NavLink to="/">Menu item 4</NavLink>
        </li>
        <li>
          <NavLink to="/">Menu item 5</NavLink>
        </li> */}
      </NavList>
    </>
  )
}

export default Nav
