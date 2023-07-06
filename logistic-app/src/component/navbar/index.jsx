import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

export const NavigationBar = () => {
  const { isLoggedin, setIsLoggedin, admin,setAdmin, setDeliveryguy } =
    useContext(UserContext);
  const navi = useNavigate();
  const handleLogout = () => {
    console.log("Logged out");
    sessionStorage.removeItem("token");
    setIsLoggedin(false);
    setAdmin(false);
    setDeliveryguy(false)

    navi("/");
  };
  return (
    <Navbar expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand href="/">TrackerYaki</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedin ? (
              <>
                {admin ? (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/deliveryguy">
                    Delivery
                  </Nav.Link>
                )}

                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/track">
                  Track
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
