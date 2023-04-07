import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import SignUp from "../../components/sign-up/SignUp";
// import SignIn from "../../components/sign-in/SignIn";
import "./Home.css";
import HeaderNav from "../../components/header/header";
import Footer from "../../components/footer/footer";

//Redux
import { useSelector } from "react-redux";



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