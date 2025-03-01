import './footer.css'


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
            <li><a href="/mentions-legales">Mentions légales</a></li>
            <li><a href="/rgpd">RGPD</a></li>
            <li><a href="/cgu">CGU</a></li>
            <li><a href="/cgv">CGV</a></li>
            <hr />
            <p>&copy; ThéTipTop - Ce site est à des fins éducatives. Aucun paiement ne sera traité.</p>
        </ul>
    </footer>
  )
}

export default Footer;
