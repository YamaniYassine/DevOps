import './footer.css'
import React, { useState, useEffect } from "react";


const Footer = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieChoice = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    setShowCookieBanner(false);
  };

  return (
    <footer>
      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <p>
            Ce site utilise des cookies pour améliorer votre expérience.{" "}
            <a href="/mentions-legales">En savoir plus</a>.
          </p>
          <button onClick={() => handleCookieChoice("accepted")}>Accepter</button>
          <button onClick={() => handleCookieChoice("declined")}>Refuser</button>
        </div>
      )}
      
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
            <li><a href="/mentions-legales">Mentions légales</a></li>
            <li><a href="/rgpd">RGPD</a></li>
            <li><a href="/cgu">CGU</a></li>
            {/* <li><a href="/cgv">CGV</a></li> */}
            <hr />
            <p>&copy; ThéTipTop - Ce site est à des fins éducatives. Aucun paiement ne sera traité.</p>
        </ul>
    </footer>
  )
}

export default Footer;
