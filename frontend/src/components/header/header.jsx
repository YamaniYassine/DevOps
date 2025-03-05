import { useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import { ReactComponent as Icon } from './nav-bar.svg';
import './header.css';

// Redux
import { useSelector } from "react-redux";

const HeaderNav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  // Assume the user object structure: user.data.user.role and user.data.user.name (or fallback to user.name)
  const userRole = user && (user.data ? user.data.user.role : null);
  const username = user ? (user.data ? user.data.user.name : user.name) : null;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar" data-testid="test1">
      <div className="container">
      <div className="logo">
        <NavLink to="/">
          <img src="/favicon3.ico" alt="ThéTipTop Logo" className="logo-img" />
        </NavLink>
      </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <Icon />
        </div>
        <div className={`nav-elements ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/jeu-concours">jeu-concours</NavLink>
            </li>
            <li>
              <NavLink to="/apropos">Apropos</NavLink>
            </li>
            {user ? (
              // Check user role: 1 for admin, 2 for employee, else default to welcome
              userRole === 1 ? (
                <button className="user-button">
                  <NavLink to="/dashboard">{username}</NavLink>
                </button>
              ) : userRole === 2 ? (
                <button className="user-button">
                  <NavLink to="/employee-dashboard">{username}</NavLink>
                </button>
              ) : (
                <button className="user-button">
                  <NavLink to="/welcome">{username}</NavLink>
                </button>
              )
            ) : (
              location.pathname === "/login" ? (
                <button className="user-button">
                  <Link className="link" to="/sign-up">S'inscrire</Link>
                </button>
              ) : (
                <button className="user-button">
                  <Link className="link" to="/login">Se connecter</Link>
                </button>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;