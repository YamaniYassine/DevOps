import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <section className="home-container">
      <div className="content-container">
      <header className="content-header">
          <div className="logo">CodeBrew</div>
          
            <p>
              Already have an account?{" "}
              <span className="link" to="/">
                Sign In
              </span>
            </p>
          
        </header>
      </div>

    </section>
  );
};

export default Home;