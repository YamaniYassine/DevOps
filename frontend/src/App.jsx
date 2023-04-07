import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";

//Pages
import Home from "./pages/home/Home";
import WelcomePage from "./pages/home/welcome/Welcome";
import PageNotFound from "./pages/not-found/PageNotFound";
import Accueil from "./pages/accueil/accueil";


const App = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Accueil />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Route>


        <Route path="/not-found" element={<PageNotFound />} />

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>

    </main>
  );
};

export default App;