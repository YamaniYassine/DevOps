import { useState } from 'react'
import { NavLink, Link, useLocation } from "react-router-dom";
import { ReactComponent as Icon } from './nav-bar.svg'
import './header.css'

//Redux
import { useSelector } from "react-redux";

const HeaderNav = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userrole = user ? (user.name ? user.name : user.data.user.role) : null;
  const username = user ? (user.name ? user.name : user.data.user.name) : null;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar" data-testid="test1">
      <div className="container">
        <div className="logo">
          ThéTipTop
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Icon />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/jeu-concours">jeu-concours</NavLink>
            </li>
            <li>
              <NavLink to="/apropos">About</NavLink>
            </li>
            {user ? (
              userrole === 1 ? (

                <button className="user-button"><NavLink to="/dashboard">{username}</NavLink></button>

              ) : (
                <button className="user-button"><NavLink to="/welcome">{username}</NavLink></button>

              )

            ) : (
              location.pathname === "/login" ? (

                <button className="user-button"><Link className="link" to="/sign-up">Sign Up</Link></button>

              ) : (
                <button className="user-button"><Link className="link" to="/login">Sign In</Link></button>
              )
            )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HeaderNav;