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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}
export default Login;
