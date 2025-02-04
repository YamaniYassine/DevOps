import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//REdux
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authActions";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});

  const { user, error, success, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      handleError(message);
    }

    if (success || user) {
      let role = null;
      if (user) {
        if (user.data && user.data.user) {
          role = user.data.user.role;
        } else if (user.role) {
          role = user.role;
        }
      }

      if (role === 1) {
        navigate("/dashboard");
      } else if (role === 2) {
        navigate("/employee-dashboard");
      } else {
        navigate("/welcome");
      }
    }
    return () => {
      dispatch(reset());
    };
  }, [error, message, user, success, navigate, dispatch]);

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };



  const handleError = (message) => {
    // Parse the error message string
    const messageObject = JSON.parse(message);
    restBorderColor();
    Object.keys(messageObject).forEach((item) => {
      changeBorderColorOnError(item);
    });

    setFormErrors(messageObject);
  };

  const restBorderColor = () => {
    const formInputs = document.querySelectorAll('.form-item');
    formInputs.forEach((input) => {
      input.classList.remove('error');
    });
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add("error");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(formFields));
  };

  return (
    <section className="form-container">
      <h1 className="form-heading">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="incorrectinfo">
          <span className="error-text">{formErrors.incorrectinfo}</span>
        </div>
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