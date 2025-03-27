import './accueil.css'
import { NavLink } from "react-router-dom";

const Accueil = () => {
    return (
        <section>
            <div class="fullview">
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h1 class="title">Thé Tip Top  </h1>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h2 class="title2">Jeu concours ThéTipTop: Achetez <span className='green'>49€</span>  de thé, obtenez un code de 10 chiffres sur votre ticket. Tous les tickets sont gagnants! Inscrivez le code en ligne pour retirer votre lot en magasin ou en ligne. <br /> <span className='green'>30 jours</span> pour jouer.</h2>
                        <p class="description3">(Récupérez vos gains dans notre boutique)</p>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <button className="concours-button"><NavLink className="no-decoration" to="/jeu-concours">Jeu Concours</NavLink></button>
                    </div>
                </div>
            </div>

            <div class="row-container3">
                <div class="content-container2">
                    <h2 class="title2">🎁 Les Gains du Jeu Concours ThéTipTop 🎉</h2>
                </div>
            </div>

            <div class="row-container3">
                <div class="image-container2">
                    <img src="/gain1.webp" alt="" />
                </div>
                <div class="content-container2">
                    <h2 class="title2">🍵 Infuseur à Thé – L’Accessoire Idéal pour une Infusion Parfaite</h2>
                    <p class="description2">Préparez votre thé en toute simplicité avec cet infuseur à thé en acier inoxydable. Son design élégant et fonctionnel permet une infusion homogène en laissant s’épanouir pleinement les arômes de votre thé préféré.</p>
                </div>
            </div>
            <div class="row-container3">
                <div class="content-container2">
                    <h2 class="title2">🍃 Boîte de 100g de Thé Détox – Votre allié bien-être</h2>
                    <p class="description2">Un mélange raffiné de plantes et de thés verts spécialement conçu pour purifier votre corps et revitaliser votre esprit. Profitez d’une infusion légère et rafraîchissante, idéale pour une routine bien-être au quotidien. 🌱✨</p>
                </div>
                <div class="image-container2">
                    <img src="/gain4.webp" alt="" />
                </div>
            </div>
            <div class="row-container3">
                <div class="image-container2">
                    <img src="/gain2.webp" alt="" />
                </div>
                <div class="content-container2">
                    <h2 class="title2">🍵 Boîte de 100g de Thé Signature – L’excellence à chaque tasse</h2>
                    <p class="description2">Notre thé emblématique, soigneusement sélectionné pour offrir une expérience gustative unique. Un équilibre parfait entre saveurs riches et arômes délicats, parfait pour les amateurs de thé qui recherchent l’excellence. ☕🌟</p>
                </div>
            </div>
            <div class="row-container3">
                <div class="content-container2">
                    <h2 class="title2">🎁 Coffret Découverte – Un voyage sensoriel à travers les saveurs (Valeur : 39€)</h2>
                    <p class="description2">Un coffret élégant comprenant une sélection exclusive de nos meilleurs thés. Parfait pour explorer de nouvelles saveurs et découvrir les bienfaits de chaque infusion. Une invitation au voyage à travers des arômes subtils et raffinés. 🎀🍂</p>
                </div>
                <div class="image-container2">
                    <img src="/gain5.webp" alt="" />
                </div>
            </div>
            
            <div class="row-container3">
                <div class="image-container2">
                    <img src="/gain3.webp" alt="" />
                </div>
                <div class="content-container2">
                    <h2 class="title2">🎁 Coffret Découverte – Une Sélection de Thés d’Exception (Valeur : 69€)</h2>
                    <p class="description2">Plongez dans un univers de saveurs raffinées avec ce coffret découverte premium, composé d’une sélection de thés d’exception. Chaque infusion est une invitation au voyage, révélant des notes délicates et équilibrées qui raviront les palais les plus exigeants.</p>
                </div>
            </div>
            <div class="row-container3">
                <div class="content-container2">
                    <h2 class="title2">🎉 Et ce n’est pas tout… Un GRAND GAGNANT sera désigné ! 🎉</h2>
                    <p class="description2">En plus des nombreux lots à remporter immédiatement, un grand tirage au sort aura lieu à la fin du jeu-concours ! Un participant chanceux repartira avec un an de thé offert, d’une valeur de 360€. 🍵✨</p>
                    <p class="description2">
                        🗓 Comment ça marche ?
                        ✔ Le jeu dure 30 jours, avec jusqu’à 1 500 000 tickets distribués.
                        ✔ Les joueurs ont 30 jours supplémentaires après la fin du concours pour vérifier leur ticket en ligne et réclamer leur lot.
                        ✔ Un tirage au sort final déterminera le grand gagnant parmi tous les participants.

                        Ne manquez pas cette chance unique de savourer du thé d’exception tout au long de l’année ! 🎁☕
                    </p>
                </div>
            </div>
            <div class="row-container3">
                <div style={{ width: "60%", height: "60%", objectFit: "cover", alignItems: "center" }} >
                <img src="/bigwinner.webp" alt="" style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
            
            {/* <div className="row-container4">
                <div className="products-section">
                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/3/0/3030.jpg" alt="Thé vert" />
                        <h3>Thé vert</h3>
                        <p>Le thé vert est un thé non fermenté, riche en antioxydants et en catéchines. Il a une saveur légère et végétale, et est souvent consommé pour ses bienfaits sur la santé, notamment pour aider à la digestion et favoriser la perte de poids.</p>
                        <button>Achetez ici</button>
                    </div>

                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/3/2/3225.jpg" alt="Thé noir" />
                        <h3>Thé noir</h3>
                        <p>Le thé noir est un thé complètement fermenté, avec une saveur plus robuste et corsée que le thé vert. Il contient plus de théine, ce qui en fait une boisson énergisante idéale pour le matin. Il est souvent apprécié avec du lait ou du sucre.</p>
                        <button>Achetez ici</button>
                    </div>

                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/18fe9d4a9062bea7a043028f9b53b66d/d/2/d2080am.jpg" alt="Thé blanc" />
                        <h3>Thé blanc</h3>
                        <p>Le thé blanc est un thé délicat et léger, fabriqué à partir de jeunes pousses de thé qui sont à peine traitées. Sa saveur douce et subtile en fait une boisson raffinée, riche en antioxydants, idéale pour la détente et la relaxation.</p>
                        <button>Achetez ici</button>
                    </div>
                </div>
            </div> */}
        </section>
    );
};


export default Accueil;
