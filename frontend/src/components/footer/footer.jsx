import "./footer.css";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookieConsent", "denied");
    setShowBanner(false);
  };

  return (
    <>
      {/* Cookie Banner - Appears before the footer */}
      {showBanner && (
        <div className="cookie-banner">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience. Consultez notre{" "}
            <a href="/mentions-legales" className="underline">
              Mentions légales
            </a>
            .
          </p>
          <div className="button-group">
            <button onClick={handleAccept} className="accept-btn">
              Accept
            </button>
            <button onClick={handleDeny} className="deny-btn">
              Deny
            </button>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer>
        <div className="newsletter-section">
          <div>
            <form>
              <label htmlFor="email">Inscrivez vous à notre newsletters</label>
              <input type="email" id="email" required />
              <button type="submit">S'inscrire</button>
            </form>
          </div>
        </div>
        <ul>
          <li>
            <a href="/mentions-legales">Mentions légales</a>
          </li>
          <li>
            <a href="/rgpd">RGPD</a>
          </li>
          <li>
            <a href="/cgu">CGU</a>
          </li>
          {/* <li>
            <a href="/cgv">CGV</a>
          </li> */}
          <hr />
          <p>&copy; ThéTipTop - Ce site est à des fins éducatives. Aucun paiement ne sera traité.</p>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
