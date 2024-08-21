import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

export const NavigationBar = () => {
  const { isLoggedin, setIsLoggedin, user} = useContext(UserContext);

  const navi = useNavigate();

  //clear user data once logged oiut
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem(", user");
    setIsLoggedin(false);
    navi("/");
  };


  return (
    <Navbar expand="lg" className="bg-info fixed-top">
      <Container className="text-center">
        <Navbar.Brand as={Link} to="/">
          TrackerYaki
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            {isLoggedin ? (
              <>
                <Nav.Link as={Link} to="/track">
                  Track
                </Nav.Link>
                {user === "admin" ? (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/deliveryguy">
                    Delivery
                  </Nav.Link>
                )}
              </>
            ) : (
              <>

                <Nav.Link as={Link} to="/track">
                  Track
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="d-flex align-items-center">
            {isLoggedin ? (
              <>
                <span className="me-2">{user}</span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
              <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
