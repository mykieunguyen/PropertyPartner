import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./Nav.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm.js";
import MainPage from "./MainPage.js";
import CreatePropertyForm from "./CreatePropertyForm.js";
import SignUpForm from "./SignUpForm.js";
import UserProperties from "./UserProperties.js";

function App() {
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <Routes>
        <Route path="/" index element={<MainPage />} />
      </Routes>
      <Routes>
        <Route path="login" element={<LoginForm />} />
      </Routes>
      <Routes>
        <Route path="properties" element={<CreatePropertyForm />} />
      </Routes>
      <Routes>
        <Route path="accounts" element={<SignUpForm />} />
      </Routes>
      <Routes>
        <Route path="properties/mine" element={<UserProperties />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
