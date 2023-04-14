import './accueil.css'
import { NavLink } from "react-router-dom";

const Accueil = () => {
    return (
        <section>
            <div class="fullview">
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h1 class="title">Thé Tip Top : </h1>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <h3 class="title2">Jeu concours ThéTipTop: Achetez <span className='green'>49€</span>  de thé, obtenez un code de 10 chiffres sur votre ticket. Tous les tickets sont gagnants! Inscrivez le code en ligne pour retirer votre lot en magasin ou en ligne. <br /> <span className='green'>30 jours</span> pour jouer.</h3>
                    </div>
                </div>
                <div class="row-container2 ">
                    <div class="content-container2">
                        <button className="concours-button"><NavLink className="no-decoration" to="/jeu-concours">Jeu Concours</NavLink></button>
                    </div>
                </div>
            </div>

            <div class="row-container2">
                <div class="content-container2">
                    <h2 class="title2">Les bienfaits du thé vert pour la santé</h2>
                    <p class="description2">Le thé est une boisson chaude appréciée dans le monde entier depuis des siècles. Cette boisson raffinée et délicate est non seulement délicieuse, mais elle offre également une multitude de bienfaits pour la santé. De l'arôme subtil du thé vert aux notes épicées du chai, il existe une variété de thés pour tous les goûts. Découvrez la richesse de cette tradition millénaire et offrez-vous une expérience gustative inoubliable avec notre sélection de thés de qualité supérieure.</p>
                </div>
                <div class="image-container2">
                    <img src="https://images.unsplash.com/photo-1504382103100-db7e92322d39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
            </div>
            <div class="row-container2">
                <div class="image-container2">
                    <img src="https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
                </div>
                <div class="content-container2">
                    <h2 class="title2">Le thé noir, une boisson savoureuse pour toutes les occasions</h2>
                    <p class="description2">Le thé est une boisson universelle qui se décline en une grande variété de saveurs et de parfums en fonction de son lieu d'origine. Du thé noir corsé d'Assam au thé vert léger de Chine en passant par les infusions de plantes aromatiques d'Afrique du Sud, il y en a pour tous les goûts. Découvrez les arômes uniques de différentes cultures à travers notre sélection de thés du monde entier. Plongez-vous dans une aventure gustative et laissez-vous transporter à travers les saveurs et les traditions de chaque région.</p>
                </div>
            </div>
            <div class="row-container2">
                <div class="content-container2">
                    <h2 class="title2">Nos Produits</h2>
                </div>
            </div>
            <div className="row-container3">
                <div className="products-section">
                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/3/0/3030.jpg" alt="Thé vert" />
                        <h3>Thé vert</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>

                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/50708da259540eeb20337bcdb367a3c9/3/2/3225.jpg" alt="Thé noir" />
                        <h3>Thé noir</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>

                    <div className="product-card">
                        <img src="https://www.palaisdesthes.com/media/catalog/product/cache/18fe9d4a9062bea7a043028f9b53b66d/d/2/d2080am.jpg" alt="Thé blanc" />
                        <h3>Thé blanc</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accueil;
