import { Row, Col, Button, Container } from "react-bootstrap";
import { useState, useContext } from "react";
import { ViewAll } from "./viewAll";
import { CreateParcel } from "./create";
import { UserContext } from "../userContext";
import "./index.css"

export function AdminPage() {
  const [showAll, setShowAll] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const {filtered } = useContext(UserContext);



  const handlePrevious = (e) => {
    e.preventDefault()
    if(currentPage -1 < 0) return
    setCurrentPage((prevState) => prevState - 1)
  }

  const handleNext = (e) => {
    e.preventDefault()
    const maxPage = filtered[filtered.length - 1].page
    if(currentPage + 2 > maxPage){
      return
    }
    setCurrentPage((prevState) => prevState + 1)

  }

  return (
      <Container className="flex-grow-1 mt-5 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col md={2}>
            <Row>
              <Button
                className="m-3"
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
                className="ms-3 mb-3"
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
            <Row className="flex-grow-1 cvh-75">
              <ViewAll currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Row>
          ) : showForm ? (
            <Row className="flex-grow-1  cvh-75">
              <CreateParcel setShowAll={setShowAll} />
            </Row>
          ) : (
            <Col className="m-4">Please select</Col>
          )}
        </Row>
      {/* Pagination */}
      <Row className={showAll ? " mb-3" : "collapse"}>
        <Col onClick={handlePrevious} xs={4} md={5} className="text-end">
          <i className='bx bx-chevron-left bx-sm'></i>
        </Col>
        <Col xs={4} md={1} className="text-center align-self-start">
          {currentPage + 1}
        </Col>
        <Col onClick={handleNext} xs={4} md={5}>
          <i className='bx bx-chevron-right bx-sm'></i>
        </Col>
      </Row>
      </Container>


  );
}
