import { useState } from "react";
import { useSignUpMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signup, signupResponse] = useSignUpMutation();

  useEffect(() => {
    if (signupResponse.isSuccess) {
      navigate("/");
    } else if (signupResponse.isError) {
      setErrorMessage("Username or email already exists!");
      return;
    }
  }, [signupResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage("Password and confirmation do not match!");
      return;
    }
    signup({ username, password, email, first_name, last_name, phone_number });
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <div className="signup-form-image">
          <div className="back-image"> </div>
          <div className="first-image"></div>
          <div className="second-image"></div>
        </div>
        <div className="create-property-container">
          <h1>Register</h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="input-icon">
                <i className="fa-regular fa-user"></i>
                <input
                  name="username"
                  placeholder="username"
                  type="text"
                  className="form-control input-padding"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-icon">
                <i className="fa-solid fa-lock"></i>
                <input
                  name="password"
                  placeholder="password"
                  type="password"
                  className="form-control input-padding"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password Confirmation</label>
              <div className="input-icon">
                <i className="fa-solid fa-lock"></i>
                <input
                  name="first_name"
                  type="password"
                  placeholder="password"
                  className="form-control input-padding"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-icon">
                <i className="fa-solid fa-at"></i>
                <input
                  name="email"
                  type="text"
                  placeholder="email"
                  className="form-control input-padding"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                type="text"
                placeholder="first name"
                className="form-control"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input
                name="last_name"
                type="text"
                placeholder="last name"
                className="form-control"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                name="phone_number"
                placeholder="0000000"
                type="text"
                className="form-control"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <input className="signup-btn" type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
