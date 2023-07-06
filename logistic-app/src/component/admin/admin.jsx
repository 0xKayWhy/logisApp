import { Row, Col, Button, Container } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { ViewAll } from "./viewAll";
import { CreateParcel } from "./create";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";


export function AdminPage() {
  const {isLoggedin, admin} = useContext(UserContext)
  const [showAll, setShowAll] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const navi = useNavigate()

  const secureCheck = () => {
    (!isLoggedin ? navi('/login') : (!admin && navi('/login')))
  }

  useEffect(()=> {
    secureCheck()
  } )

  secureCheck()

  return (
    <div>
      <Container className="mt-3" style={{ marginLeft: "15px" }}>
        <Row>
          <Col md={2}>
            <Row className="mb-3">
              <Button
                variant="primary"
                onClick={() => {
                  if (showForm) {
                    setShowForm(!showForm);
                    setShowAll(!showAll);
                  } else {
                    setShowAll(!showAll);
                  }
                }}
              >
                View All
              </Button>
            </Row>
            <Row>
              <Button
                variant="primary"
                onClick={() => {
                  if (showAll) {
                    setShowForm(!showForm);
                    setShowAll(!showAll);
                  } else {
                    setShowForm(!showForm);
                  }
                }}
              >
                Create Shipment
              </Button>
            </Row>
          </Col>
          {showAll ? (
            <ViewAll />
          ) : showForm ? (
            <CreateParcel  setShowAll={setShowAll}/>
          ) : (
            <Col>Please select</Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
