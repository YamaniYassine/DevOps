import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './jeu-concours.css';

const Concours = () => {

  const [ticketInfo, setTicketInfo] = useState(null);
  const [spinningPrize, setSpinningPrize] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);

  const { user } = useSelector((state) => state.auth);


  const userName = user ? (user.name || (user.data && user.data.user.name)) : null;
  const userEmail = user ? (user.email || (user.data && user.data.user.email)) : null;

  const prizes = [
    { name: "Infuser", image: "/gain1.webp" },
    { name: "Detox", image: "/gain4.webp" },
    { name: "Signature", image: "/gain2.webp" },
    { name: "Coffret 39", image: "/gain5.webp" },
    { name: "Coffret 69", image: "/gain3.webp" }
  ];
  
    function scrollToForm() {
        var formAnchor = document.getElementById("myForm");
        formAnchor.scrollIntoView({ behavior: "smooth" });
      }
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const ticketCode = event.target['ticket-code'].value;
  
    try {
      const response = await fetch(`/ticketApi/check-ticket/${ticketCode}`);
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        setTicketInfo(data.ticket);
        startSpinningEffect(data.ticket.gain);
        await fetch(`/ticketApi/mark-ticket-used/${ticketCode}`, { method: 'POST' });
  
        // Add the winner's information to the "Winners" table
        const winnerData = {
          name: event.target['name'].value,
          email: event.target['email'].value,
          ticketCode: ticketCode,
          prize: data.ticket.gain,
        };
  
        const addWinnerResponse = await fetch(`/ticketApi/add-winner`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(winnerData),
        });
  
        if (addWinnerResponse.ok) {
          console.log('Winner added to the "Winners" table');
        } else {
          console.error('Error adding winner to the "Winners" table');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };
  


  const startSpinningEffect = (actualPrize) => {
    setIsSpinning(true);
    let index = 0;

    const spinningInterval = setInterval(() => {
      setSpinningPrize(prizes[index].name);
      index = (index + 1) % prizes.length;
    }, 150); // Rotate prizes quickly

    setTimeout(() => {
      clearInterval(spinningInterval);
      setIsSpinning(false);
      setSpinningPrize(actualPrize);
    }, 3000); // Stop after 3 seconds
  };

  const renderPopup = () => {
    if (!ticketInfo) return null;

    const finalPrize = prizes.find(prize => prize.name === spinningPrize);

    return (
      <div className="popup">
        <button className="close-button" onClick={() => setTicketInfo(null)}>X</button>
        <h2>🎉 Félicitations ! 🎉</h2>
        <p>{isSpinning ? "Votre prix est en train d'être déterminé..." : "Vous avez gagné :"}</p>
        <p className={isSpinning ? "spinning-prize" : "final-prize"}>{spinningPrize}</p>
        {!isSpinning && finalPrize && (
          
          <img src="/gain1.webp" alt={finalPrize.name} className="prize-image" />
          
        )}
      </div>
    );
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
              Si vous avez acheté pour au moins 49€ de thé dans l'une de nos boutiques, vous avez reçu un ticket avec un code à <span className="green">10 chiffres</span>. Entrez ce code ci-dessous pour accéder au jeu et tenter de remporter l'un de nos nombreux lots. Le jeu est <span className="green">100% gagnant</span>, alors n'hésitez plus et jouez dès maintenant !
            </h3>
          </div>
        </div>
        <div className="row-container2">
          <div className="content-container2">
            <button className="concours-button" onClick={scrollToForm}>Jouer</button>
          </div>
        </div>
      </div>
      <div className="">
      <img src="/backgroudphoto.webp" alt="Flyer Jeu Concours" className="flyer-image"/>
      </div>
      <div className="">
      <h2 style={{ 
              marginTop: '15px', 
              marginBottom: '15px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
          }}>
          Participez au Jeu Concours ici
      </h2>
      </div>
      <form id="myForm" onSubmit={handleFormSubmit}>
                <label htmlFor="name">Nom:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    defaultValue={userName || ""}
                    readOnly={!!user}
                    required 
                /><br />
                
                <label htmlFor="email">E-mail:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    defaultValue={userEmail || ""}
                    readOnly={!!user}
                    required 
                /><br />
                
                <label htmlFor="ticket-code">Code de 10 chiffres:</label>
                <input 
                    type="text" 
                    id="ticket-code" 
                    name="ticket-code" 
                    minLength="10" 
                    maxLength="10" 
                    required 
                /><br />
                
                <input type="submit" value="Jouer" />
            </form>
      {renderPopup()}
    </section>
  );
};

export default Concours;