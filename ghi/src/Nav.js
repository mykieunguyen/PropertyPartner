import "./nav.css";
import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice";
import { useLogoutMutation } from "./app/apiSlice";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navcon = () => {
  const { data: account } = useGetTokenQuery();
  const [logout] = useLogoutMutation();

  return (
    <>
      <Navbar className="navbar sticky-top navbar-light bg-light">
        <div className="nav-container">
          <Nav className="left-nav">
            {account && (
              <Nav.Link href="/properties/new">Add Property</Nav.Link>
            )}
            {account && (
              <Nav.Link href="/properties/mine">My properties</Nav.Link>
            )}
          </Nav>
          <Navbar.Brand href="/">
            <span>Property </span>
            <i className="fa-solid fa-key"></i>
            <span> Partner</span>
          </Navbar.Brand>{" "}
          <Nav className="right-nav">
            {!account && <Nav.Link href="/login">Login</Nav.Link>}
            {!account && <Nav.Link href="accounts">Sign up</Nav.Link>}
            {account && <Nav.Link onClick={logout}>Logout</Nav.Link>}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Navcon;
