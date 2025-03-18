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
                        <h3 class="title2">Jeu concours ThéTipTop: Achetez <span className='green'>49€</span>  de thé, obtenez un code de 10 chiffres sur votre ticket. Tous les tickets sont gagnants! Inscrivez le code en ligne pour retirer votre lot en magasin ou en ligne. <br /> <span className='green'>30 jours</span> pour jouer.</h3>
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
                <div class="content-container2">
                    <h2 class="title2">🍃 Boîte de 100g de Thé Détox</h2>
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
                    <h2 class="title2">🍵 Boîte de 100g de Thé Signature</h2>
                    <p class="description2">Notre thé emblématique, soigneusement sélectionné pour offrir une expérience gustative unique. Un équilibre parfait entre saveurs riches et arômes délicats, parfait pour les amateurs de thé qui recherchent l’excellence. ☕🌟</p>
                </div>
            </div>
            <div class="row-container3">
                <div class="content-container2">
                    <h2 class="title2">🎁 Coffret Découverte – Valeur 39€</h2>
                    <p class="description2">Un coffret élégant comprenant une sélection exclusive de nos meilleurs thés. Parfait pour explorer de nouvelles saveurs et découvrir les bienfaits de chaque infusion. Une invitation au voyage à travers des arômes subtils et raffinés. 🎀🍂</p>
                </div>
                <div class="image-container2">
                    <img src="/gain5.webp" alt="" />
                </div>
            </div>
            
            <div className="row-container4">
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
            </div>
        </section>
    );
};


export default Accueil;
