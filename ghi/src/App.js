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
import PropertyDetail from "./PropertyDetail.js";

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
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login">
          <Route index element={<LoginForm />}></Route>
        </Route>
        <Route path="properties">
          <Route index element={<CreatePropertyForm />} />
          <Route exact path="/properties/:id" element={<PropertyDetail />} />
        </Route>
        <Route path="accounts">
          <Route index element={<SignUpForm />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="properties/mine" element={<UserProperties />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
