import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authActions";
import { reset } from "../../features/auth/authSlice";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ localStorage }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});
  
  const { user, error, success, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetBorderColor = () => {
    const formInputs = document.querySelectorAll('.form-item');
    formInputs.forEach((input) => {
      input.classList.remove('error');
    });
  };

  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add("error");
  };

  const handleError = useCallback((message) => {
    // Parse the error message string
    const messageObject = JSON.parse(message);
    resetBorderColor();
    Object.keys(messageObject).forEach((item) => {
      changeBorderColorOnError(item);
    });

    setFormErrors(messageObject);
  }, []);

  useEffect(() => {
    if (error) {
      handleError(message);
    }

    if (success && user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [error, message, user, success, navigate, dispatch, handleError]);

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    dispatch(registerUser(formFields));
  };

  return (
    <section className="form-container">
      <h1 className="form-heading">Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="name">
          <label>Nom</label>
          <input
            placeholder="Entrez votre nom"
            name="name"
            type="text"
            value={formFields.name}
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.name}</span>
        </div>
        <div className="form-item" id="alreadyused">
          <span className="error-text">{formErrors.alreadyused}</span>
        </div>
        <div className="form-item" id="email">
          <label>E-mail</label>
          <input
            placeholder="Entrez votre email"
            name="email"
            type="text"
            value={formFields.email}
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.email}</span>
        </div>
        <div className="form-item" id="incorrectconfirmation">
          <span className="error-text">{formErrors.incorrectconfirmation}</span>
        </div>
        <div className="form-item" id="password">
          <label>Mot de passe</label>
          <input
            placeholder="Entrez votre mot de passe"
            name="password"
            type="password"
            value={formFields.password}
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.password}</span>
        </div>

        <div className="form-item" id="confirmPassword">
          <label>Confirmez le mot de passe</label>
          <input
            placeholder="Confirmez votre mot de passe"
            name="confirmPassword"
            type="password"
            value={formFields.confirmPassword}
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.confirmPassword}</span>
        </div>

        <button className="form-button" type="submit">
          S'inscrire
        </button>
      </form>
    </section>
  );
};

export default SignUp;
