import React, { Component } from 'react'
import { Link } from 'react-router'

import Logo from '../Logo'
import NavLink from '../NavLink'

import './index.scss'

class Header extends Component {
  render() {
    return(
      <header className="header">
        <Link className="header__logo" to="/">
          <Logo className="logo_image"></Logo>
        </Link>
        <nav className="header__nav">
          <NavLink className="nav__link" to="/gallery" name="Галерея" />
          <NavLink className="nav__link" to="/docs" name="Документы" />
          <NavLink className="nav__link" to="/video" name="Видео" />
          <NavLink className="nav__link" to="/music" name="Музыка" />
        </nav>
      </header>
    )
  }
}

export default Header