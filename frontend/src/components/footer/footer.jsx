import { useState } from 'react'
import { NavLink, Link, useLocation } from "react-router-dom";
import './footer.css'

//Redux
import { useSelector } from "react-redux";

const Footer = () => {

  return (
    <footer>
      
      <div className="newsletter-section">
        <div>
          <form >
          <label htmlFor="email">Inscrivez vous à notre newsletters</label>
          <input type="email" id="email"  required />
          <button type="submit">S'inscrire</button>
        </form>
        </div>
      </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/apropos">About</a></li>
            <li><a href="#">Contact</a></li>
            <hr />
            <p>&copy; ThéTipTop - Ce site est à des fins éducatives. Aucun paiement ne sera traité.</p>
        </ul>
    </footer>

    
  )
}

export default Footer;
