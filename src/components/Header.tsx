import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav'

import HeaderBox from './styles/Header'

interface Props {
  totalComponentHeight: number
}

const Header: React.FC<Props> = ({ totalComponentHeight }) => {
  const [navOpen, toggleNavOpen] = useState(false)
  const handleNavToggling = () => {
    if (navOpen) {
      toggleNavOpen(false)
      return
    }
    toggleNavOpen(true)
  }
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(e)
    if (navOpen === false) return
    toggleNavOpen(false)
    // if (e.currentTarget.localName.toLowerCase() === 'a') toggleNavOpen(false)
  }
  return (
    <HeaderBox bottomAdditionalSpace={totalComponentHeight}>
      <header className="desktopContainer header">
        <Link to="/">
          <h1>Budget</h1>
        </Link>
        <div className="menuIconMobile onlyMobile" onClick={handleNavToggling}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Nav isOpen={navOpen} toggleNavOpen={handleNavToggling} handleLinkClick={handleLinkClick}/>
      </header>
    </HeaderBox>
  )
}

export default Header
