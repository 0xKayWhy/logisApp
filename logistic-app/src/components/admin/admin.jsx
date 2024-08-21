import { Row, Col, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { ViewAll } from "./viewAll";
import { CreateParcel } from "./create";
import "./index.css"
import { PageCount } from "../pageCount";

export function AdminPage() {
  const [showAll, setShowAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(0)

  return (
      <Container className="flex-grow-1 mt-5 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col md={2}>
            <Row>
              <Button
                className="m-3"
                variant="primary"
                onClick={() => setShowAll(true)}
              >
                View All
              </Button>
            </Row>
            <Row>
              <Button
                className="ms-3 mb-3"
                variant="primary"
                onClick={() => setShowAll(false)}
              >
                Create Shipment
              </Button>
            </Row>
          </Col>
          {showAll ? (
            <Row className="flex-grow-1 cvh-75">
              <ViewAll currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Row>
          ) :
            <Row className="flex-grow-1  cvh-75">
              <CreateParcel setShowAll={setShowAll} />
            </Row>
          }
        </Row>
        {showAll &&
          <PageCount currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      </Container>


  );
}
