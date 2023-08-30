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
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Property Partner</Navbar.Brand>
          <Nav className="me-auto">
            {!account && <Nav.Link href="/login">Login</Nav.Link>}
            {account && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            {account && <Nav.Link href="/properties/new">Add Property</Nav.Link>}
            {!account && <Nav.Link href="accounts">SignUp</Nav.Link>}
            {account && <Nav.Link href="/properties/mine">My properties</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navcon;
