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
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          LOGO
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
              <NavLink to="/">Page1</NavLink>
            </li>
            <li>
              <NavLink to="/">Page 2</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
            {user ? (
              userrole === 1 ? (

                <button className="user-button"><NavLink to="/welcome">{username}</NavLink></button>

              ) : (
                <button className="user-button"><span>{username}</span></button>

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

{/* <header className="content-header">
         <div className="logo">YAMANI</div>
          {user ? (
            userrole === 1 ? (

              <p>Welcome admin <span>{username}!</span></p>

            ) : (
              <p>Welcome user <span>{username}!</span></p>

            )

            ) : (
              location.pathname === "/" ? (
                <p>
                  Don't have an account?{" "}
                  <Link className="link" to="/sign-up">
                    Sign Up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link className="link" to="/">
                    Sign In
                  </Link>
                </p>
              )
            )
          }
          
          
        </header> */}