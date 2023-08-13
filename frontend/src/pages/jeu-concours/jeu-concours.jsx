import React, { useState } from 'react';
import './jeu-concours.css';

const Concours = () => {
    function scrollToForm() {
        var formAnchor = document.getElementById("myForm");
        formAnchor.scrollIntoView({ behavior: "smooth" });
      }
  const [ticketInfo, setTicketInfo] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const ticketCode = event.target['ticket-code'].value;

    try {
      const response = await fetch(`/ticketApi/check-ticket/${ticketCode}`);
      const data = await response.json();

      if (data.success) {
        setTicketInfo(data.ticket);
        await fetch(`/ticketApi/mark-ticket-used/${ticketCode}`, { method: 'POST' });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  const renderPopup = () => {
    if (ticketInfo) {
        return (
            <div className="popup">
                <button className="close-button" onClick={() => setTicketInfo(null)}>X</button>
                <h2>Félicitations !</h2>
                <p>Vous avez gagné :</p>
                <p>{ticketInfo.gain}</p>
            </div>
        );
    }
    return null;
  };

  return (
    <section>
      <div className="fullview">
        <div className="row-container2">
          <div className="content-container2">
            <h1 className="title">Jeu concours ThéTipTop</h1>
          </div>
        </div>
        <div className="row-container2">
          <div className="content-container2">
            <h3 className="title2">
              Si vous avez acheté pour au moins 49€ de thé dans l'une de nos boutiques, vous avez reçu un ticket avec un code à <span className="green">10 chiffres</span>. Entrez ce code ci-dessous pour accéder au jeu et tenter de remporter l'un de nos nombreux lots. Le jeu est <span className="green">100% gagnant</span>, alors n'hésitez plus et jouez dès maintenant ! Si vous avez des questions, n'hésitez pas à nous contacter.
            </h3>
          </div>
        </div>
        <div className="row-container2">
          <div className="content-container2">
            <button className="concours-button" onClick={scrollToForm}>Jouer</button>
          </div>
        </div>
      </div>
      <form id="myForm" onSubmit={handleFormSubmit}>
        <label htmlFor="name">Nom:</label>
        <input type="text" id="name" name="name" required /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required /><br />
        <label htmlFor="ticket-code">Code de 10 chiffres:</label>
        <input type="text" id="ticket-code" name="ticket-code" minLength="10" maxLength="10" required /><br />
        <input type="submit" value="Jouer" />
      </form>
      {renderPopup()}
    </section>
  );
};

export default Concours;