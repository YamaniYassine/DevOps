import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import SignUp from "../../components/sign-up/SignUp";
// import SignIn from "../../components/sign-in/SignIn";
import "./Home.css";


//Redux
import { useSelector } from "react-redux";


const Home = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const userrole = user ? (user.name ? user.name : user.data.user.role) : null;
    const username = user ? (user.name ? user.name : user.data.user.name) : null;
    console.log(userrole);
  return (
    <section className="home-container">
      <div className="content-container">
        <header className="content-header">
         <div className="logo">YAMANI</div>
         {/* {userrole === 0 ? (
            <p>
              userrole 0?{" "}
              <Link className="link" to="/sign-up">
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link className="link" to="/">
                Sign In
              </Link>
            </p>
          )} */}

          {user ? (
            userrole === 1 ? (

              <p>Welcome admin <span>{username}!</span></p>

            ) : (
              <p>Welcome user <span>{username}!</span></p>

            )

            ) : (
              location.pathname === "/" ? (
                <p>
                  Don't have an account?{" "}
                  <Link className="link" to="/sign-up">
                    Sign Up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link className="link" to="/">
                    Sign In
                  </Link>
                </p>
              )
            )
          }
          
          
        </header>
    <div className="outlet-container">
          <Outlet />
    </div>
      
      </div>

    </section>
  );
};

export default Home;