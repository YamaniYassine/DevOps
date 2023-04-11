import './jeu-concours.css'

const Concours = () => {
    function scrollToForm() {
        var formAnchor = document.getElementById("myForm");
        formAnchor.scrollIntoView({ behavior: "smooth" });
      }
    return (
        <section>
            <div class="fullview">
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h1 class="title">Jeu concours ThéTipTop</h1>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h3 class="title2">Si vous avez acheté pour au moins 49€ de thé dans l'une de nos boutiques, vous avez reçu un ticket avec un code à <span className='green'>10 chiffres</span> . Entrez ce code ci-dessous pour accéder au jeu et tenter de remporter l'un de nos nombreux lots. Le jeu est <span className='green'>100% gagnant</span> , alors n'hésitez plus et jouez dès maintenant ! Si vous avez des questions, n'hésitez pas à nous contacter.</h3>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <button className="concours-button" onClick={scrollToForm}>Jouer</button>
                    </div>
                </div>
            </div>
            <form id="myForm" action="">
                <label for="name">Nom:</label>
                <input type="text" id="name" name="name" required /><br />
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required /><br />
                <label for="ticket-code">Code de 10 chiffres:</label>
                <input type="text" id="ticket-code" name="ticket-code" minlength="10" maxlength="10" required /><br />
                <input type="submit" value="Jouer" />
            </form>
        </section>
    );
};

export default Concours;
