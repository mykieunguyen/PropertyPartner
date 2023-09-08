import { useLoginMutation } from "./app/apiSlice";
import { useState } from "react";
import "./login.css";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, loginResponse] = useLoginMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ username, password });
    props.toggle();
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="top-cont">
          <button onClick={props.toggle}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <div className="login-pic">
            <div className="left-pic"></div>
            <div className="pic-1"></div>
            <div className="right-pic"></div>
          </div>
          <h2>Welcome Back!</h2>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Username</label>
          <div className="input-icon">
            <i class="fa-solid fa-user"></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="form-control input-padding"
            />
          </div>
          <label>Password</label>
          <div className="input-icon">
            <i className="login-icon fa-solid fa-lock"></i>{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="form-control input-padding"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
