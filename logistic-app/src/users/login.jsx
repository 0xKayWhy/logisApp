import { useState , useContext, useEffect} from "react";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../component/userContext";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import jwtDecode from "jwt-decode"

export default function Login() {
  const {setIsLoggedin, setRole } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosConfig.post("/user/login", { username, password });
      if(res.status === 200) {
        const token = res.data.token;
        const roleToken = res.data.role.toLowerCase()
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", roleToken);
        setIsLoggedin(true)
        setRole(roleToken)
        navi(`/${roleToken}`)
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col md={8} lg={6} xs={12}>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    {error && <p className="text-danger">{error}</p>} {/* Display error message */}

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Don't have an account?{" "}
                      <a href="/register" className="text-primary fw-bold">
                        Sign up
                      </a>
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