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
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up!</h5>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation:</label>
            <input
              name="first_name"
              type="password"
              className="form-control"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              name="email"
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              name="first_name"
              type="text"
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
              className="form-control"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              name="phone_number"
              type="text"
              className="form-control"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
