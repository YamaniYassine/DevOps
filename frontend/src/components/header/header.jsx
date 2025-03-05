import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as MenuIcon } from './nav-bar.svg';
import './header.css';

// Redux
import { useSelector } from 'react-redux';

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Fermer le menu lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Gestion de l'état utilisateur
  const userRole = user && (user.data ? user.data.user.role : null);
  const username = user ? (user.data ? user.data.user.name : user.name) : null;

  // Déterminer le lien utilisateur en fonction du rôle
  const getUserLink = () => {
    if (!user) {
      return location.pathname === '/login' ? '/sign-up' : '/login';
    }

    switch (userRole) {
      case 1:
        return '/dashboard';
      case 2:
        return '/employee-dashboard';
      default:
        return '/welcome';
    }
  };

  // Texte du bouton utilisateur
  const getUserButtonText = () => {
    if (user) {
      return username || 'Mon compte';
    }
    return location.pathname === '/login' ? "S'inscrire" : 'Connexion';
  };

  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="container">
        {/* Logo */}
        <NavLink to="/" aria-label="Retour à l'accueil">
          <img 
            src="/favicon3.ico" 
            alt="ThéTipTop Logo" 
            className="logo-img"
          />
        </NavLink>

        {/* Menu Hamburger */}
        <button 
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          <MenuIcon aria-hidden="true" />
        </button>

        {/* Navigation */}
        <div 
          className={`nav-elements ${isMenuOpen ? 'active' : ''}`}
          role="navigation"
        >
          <ul role="menubar">
            <li role="none">
              <NavLink 
                to="/" 
                role="menuitem"
                end
              >
                Accueil
              </NavLink>
            </li>

            <li role="none">
              <NavLink 
                to="/jeu-concours" 
                role="menuitem"
              >
                Jeu-concours
              </NavLink>
            </li>

            <li role="none">
              <NavLink 
                to="/apropos" 
                role="menuitem"
              >
                À propos
              </NavLink>
            </li>

            {/* Bouton Utilisateur */}
            <li role="none">
              <NavLink
                to={getUserLink()}
                role="menuitem"
                className={({ isActive }) => 
                  `user-button ${isActive ? 'active' : ''}`
                }
              >
                {getUserButtonText()}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;