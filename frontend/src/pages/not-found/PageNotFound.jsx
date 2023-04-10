import React from "react";
import "./page-not-found.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="not-found-container">
      <h1 className="not-found-header">404 - Page introuvable</h1>
      <p className="not-found-text">
      Il semblerait que la page que vous recherchez n’existe plus.
        <Link className="link" to="/">
          Accueil
        </Link>
      </p>
    </section>
  );
};

export default PageNotFound;