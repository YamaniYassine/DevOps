import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const defaultFormFields = {
    email: "",
    password: "",
  };
const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [formErrors, setFormErrors] = useState({});

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const changeBorderColorOnError = (inputName) => {
        let formInput = document.getElementById(`${inputName}`);
        formInput.classList.add("error");
      };

      
    const handleSubmit = (event) => {
        event.preventDefault();
        
      };
    
      return (
        <section className="form-container">
          <h1 className="form-heading">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-item" id="email">
              <label>Email</label>
              <input
                placeholder="Enter your email"
                name="email"
                type="text"
                value={formFields.email}
                onChange={hanldeInputValueChange}
              />
              <span className="error-text">{formErrors.email}</span>
            </div>
            <div className="form-item" id="password">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                name="password"
                type="password"
                value={formFields.password}
                onChange={hanldeInputValueChange}
              />
              <span className="error-text">{formErrors.password}</span>
            </div>
            <div className="button-container">
              <button className="form-button" type="submit">
                Sign In
              </button>
            </div>
    
          </form>
        </section>
      );

  };
  
  export default SignIn;