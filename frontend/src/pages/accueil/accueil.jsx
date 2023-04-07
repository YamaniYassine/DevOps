import './accueil.css'


const Accueil = () => {
    return (
        <section>
            <div class="row-container2">
                <div class="content-container2">
                    <h1 class="title2">Title 1</h1>
                    <p class="description2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
                <div class="image-container2">
                    <img src="https://via.placeholder.com/300x200" alt="placeholder image" />
                </div>
            </div>
            <div class="row-container2">
                <div class="image-container2">
                    <img src="https://via.placeholder.com/300x200" alt="placeholder image" />
                </div>
                <div class="content-container2">
                    <h1 class="title">Title 2</h1>
                    <p class="description2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
            </div>
            <div class="row-container2">
                <div class="content-container2">
                    <h1 class="title2">Nos Produits</h1>
                </div>
            </div>
            <div className="row-container3">
                <div className="products-section">
                    <div className="product-card">
                        <img src="https://via.placeholder.com/300x300" alt="product 1" />
                        <h2>Product 1</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>

                    <div className="product-card">
                        <img src="https://via.placeholder.com/300x300" alt="product 2" />
                        <h2>Product 2</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>

                    <div className="product-card">
                        <img src="https://via.placeholder.com/300x300" alt="product 3" />
                        <h2>Product 3</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <button>Buy Here</button>
                    </div>
                </div>
            </div>



        </section>
    );
};

export default Accueil;
