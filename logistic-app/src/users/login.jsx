import { useState, useContext, useEffect } from "react";
import axiosConfig from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/userContext";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";

export default function Login() {
  const {
    setIsLoggedin,
    setRole,
    username,
    setUsername,
    password,
    setPassword,
    isLoggedin,
    setLoading,
  } = useContext(UserContext);
  const [error, setError] = useState("");

  const navi = useNavigate();


  //set role and token to user once logged in
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosConfig.post("/user/login", { username, password });

      if (res.status === 200) {
        const token = res.data.token;
        const roleToken = res.data.role.toLowerCase();
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", roleToken);
        setIsLoggedin(true);
        setRole(roleToken);
        setUsername("");
        setPassword("");
        navi(`/${roleToken}`, { replace: true });
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  //check if user is logged in and redirect to homepage if true
  useEffect(() => {
    if (isLoggedin) return navi("/");
  }, [isLoggedin, navi]);

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} className="mt-5">
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase">
                  Login
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}{" "}
                    {/* Display error message */}
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary fw-bold">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
