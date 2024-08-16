import { Row, Col, Button, Container, Form, Card } from "react-bootstrap";
import { useContext, useState } from "react";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../component/userContext";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [RegisterAs, setRegisterAs] = useState("");
  const {setUsername, setPassword} = useContext(UserContext)

  const navi = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    try {
      const response = await axiosConfig.post("user/register", {
        firstName: firstName,
        lastName: lastName,
        username: newUsername,
        password: newPassword,
        email,
        RegisterAs: RegisterAs,
      });
      if (response.status === 200) {
        setNewUsername("");
        setNewPassword("");
        navi("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} className="mt-5">
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase">
                  Register
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRegisterAs">
                      <Form.Label>Register As</Form.Label>
                      <Form.Select
                        value={RegisterAs}
                        onChange={(e) => setRegisterAs(e.target.value)}
                        required
                      >
                        <option>Please Select</option>
                        <option value="Admin">Admin</option>
                        <option value="DeliveryGuy">Delivery Guy</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Register
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Already have an account?{" "}
                      <a href="/login" className="text-primary fw-bold">
                        Sign in
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
