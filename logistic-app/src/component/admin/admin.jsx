import { Row, Col, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { ViewAll } from "./viewAll";
import { CreateParcel } from "./create";


export function AdminPage() {
  const [showAll, setShowAll] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Container  className="d-flex flex-column min-vh-100" >
        <Row>
          <Col md={2}>
            <Row className="m-4">
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
            <Row className="m-4">
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
            <Row>
              <ViewAll />
            </Row>
          ) : showForm ? (
            <Row>
              <CreateParcel  setShowAll={setShowAll}/>

            </Row>
          ) : (
            <Col className="m-4">Please select</Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
