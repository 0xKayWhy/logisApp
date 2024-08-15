import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import axiosConfig from "../../config/axios";

export const NavigationBar = () => {
  const { isLoggedin, setIsLoggedin, role } = useContext(UserContext);
  const [user, setUser] = useState("");

  const navi = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setIsLoggedin(false);
    navi("/");
  };

  const currentUser = async () => {
    try {
      const userRes = await axiosConfig.get("/user/user", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (userRes.status === 200) {
        setUser(userRes.data.firstName);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      currentUser();
    }
  }, [isLoggedin]);

  return (
     <Navbar expand="lg" className="bg-info">
      <Container className="text-center">
        <Navbar.Brand as={Link} to="/" className="">
          TrackerYaki
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav>
            {isLoggedin ? (
              <>
                {role === "admin" ? (
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
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
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
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
