import { useState } from 'react'
import { NavLink, Link, useLocation } from "react-router-dom";
import './footer.css'

//Redux
import { useSelector } from "react-redux";

const Footer = () => {

  return (
    <footer>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </footer>

    
  )
}

export default Footer;
