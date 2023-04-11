import React from "react";
import { Outlet } from "react-router-dom";
import "./Home.css";
import HeaderNav from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Home = () => {
  return (
    <section className="home-container">
      <div className="content-container">
        <header>
          <HeaderNav />
        </header>
        <div className="outlet-container">
          <Outlet />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>

    </section>
  );
};

export default Home;