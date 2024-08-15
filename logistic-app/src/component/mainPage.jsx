import { Col, Container, Row, Card, Table, Button } from "react-bootstrap";
import { TrackBar } from "./track/trackBar";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { NavLink } from "react-router-dom";

export default function MainPage() {

  const {setUsername, setPassword, isLoggedin} = useContext(UserContext)

  const loginSample = [
    {
    type : "admin",
    username : "johnDoe",
    password : "johnDoe"
    },
    {
      type : "delivery1",
      username : "richardDoe",
      password : "richardDoe"
    },
    {
      type : "delivery2",
      username : "janeDoe",
      password : "janeDoe"
    }
  ]

  const handleLoginClick =  (username, password) => {
    setUsername(username)
    setPassword(password)
     
  };

  return (
    <Container className="text-center">
      <Col>
      <Row className="mt-5 d-flex">
      <h1 className="mb-5">Track and Trace your Parcel</h1>
      <div className="d-flex justify-content-center mb-5">
        <TrackBar />
      </div>
      </Row>
      {!isLoggedin && <Row className="d-flex justify-content-center m-2 ">
        <h3>
        Login Samples
          </h3>  
          {loginSample.map((sample) => (
       <Card key={sample.type} className="m-2" style={{width : "18rem"}}>
        <Card.Body>
          <Card.Title>
            {sample.type}
        </Card.Title>
          <Table>
            <tbody >
            <tr>
              <td>Username :</td>
              <td>{sample.username}</td>
            </tr>
            <tr>
              <td>Password :</td>
              <td>{sample.password}</td>
            </tr>
            </tbody>
          </Table>
          <NavLink to="/login">
          <Button onClick={() => handleLoginClick(sample.username, sample.password)}>
        <div className="text-end" >Try this</div>
          </Button>
          </NavLink>
        </Card.Body>
       </Card>
          ))
        }
      </Row>}
      </Col>
    </Container>
  );
}
