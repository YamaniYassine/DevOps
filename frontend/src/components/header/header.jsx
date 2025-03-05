import { useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import { ReactComponent as Icon } from './nav-bar.svg';
import './header.css';
import { useSelector } from "react-redux";

const HeaderNav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const userRole = user && (user.data ? user.data.user.role : null);
  const username = user ? (user.data ? user.data.user.name : user.name) : null;

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/">
          <img src="/favicon3.ico" alt="Logo" className="logo-img" />
        </NavLink>

        <div className="menu-icon" onClick={() => setShowNavbar(!showNavbar)}>
          <Icon />
        </div>

        <div className={`nav-elements ${showNavbar && 'active'}`}>
          <ul>
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/jeu-concours">jeu-concours</NavLink></li>
            <li><NavLink to="/apropos">About</NavLink></li>
            
            {user ? (
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
                  <Link to="/sign-up">SIGN UP</Link>
                </button>
              ) : (
                <button className="user-button">
                  <Link to="/login">SIGN IN</Link>
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