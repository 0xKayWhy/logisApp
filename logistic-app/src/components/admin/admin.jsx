import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { ViewAll } from "./viewAll";
import { CreateParcel } from "./create";
import { UserContext } from "../userContext";
import { PageCount } from "../pageCount";


export function AdminPage() {

  const [filter, setFilter] = useState(""); 
  const [showAll, setShowAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(0)
  const {setFiltered, filtered, allParcels, oriData} = useContext(UserContext)


  //allow user to filter parcel based on trackingNo
  const filterParcel = () => {
    const arrangedParcel = [];
    const parcels = oriData.filter((parcel) => parcel.trackingNo == filter);
    if (parcels.length === 0) {
      setFiltered([]);
      return;
    } else {
      arrangedParcel.push({ page: 1, data: [parcels[0]] });
    }
    setFiltered(arrangedParcel);
    setCurrentPage(0);
  };

  //set filtered data on page load
  useEffect(() => {
    setFiltered(allParcels);
  }, [allParcels,setFiltered]);

  //once user cleared search, display all data
  useEffect(() => {
    if (filter.length === 0) {
      setFiltered(allParcels);
    }
  }, [filter,setFiltered,allParcels]);

  //check if currentPage still valid
  useEffect(()=> {
    if(filtered.length === 0 ){
      return
    }
    const maxPage = filtered[filtered.length - 1].page
    if(maxPage === currentPage){
      setCurrentPage(maxPage - 1)
    }
  },[filtered,currentPage,setCurrentPage])


  return (
      <Container>
        <Row >
          <Row>
          <Col md={3}>
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
          <Col md={4} className="ms-auto align-self-end">
          <Row className="mb-3">
          {showAll && 
          <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                filterParcel();
              }}
            >
              <Form.Control
                type="search"
                placeholder="Tracking Number"
                aria-label="Search"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
              <Button
                type="submit"
                className="ms-3 d-flex justify-content-center align-items-center"
              >
                <i className="bx bx-search-alt bx-sm"></i>
              </Button>
            </Form>}
            </Row>
          </Col>
          </Row>
          {showAll ? (
            <Row className="d-flex flex-column">
              <ViewAll currentPage={currentPage} className="flex-grow-1"/>
              <PageCount currentPage={currentPage} setCurrentPage={setCurrentPage} className="mt-auto"/>
            </Row>
          ) :
            <Row>
              <CreateParcel/>
            </Row>
          }
        </Row>
      </Container>


  );
}
