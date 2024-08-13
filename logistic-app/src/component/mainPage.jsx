import {Col, Button,Form} from "react-bootstrap";
import {useContext} from 'react'
import { UserContext } from "../component/userContext";



export default function MainPage(){

    const {search, setSearch ,handleSearch} = useContext(UserContext);

        return (
            <div   style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",

            }}>
              <h1 className="mb-5" >Track and Trace your Parcel</h1>
            <Col >
            <Form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <Form.Control
                  type="search"
                  col={8}
                  placeholder="Tracking Number"
                  aria-label="Search"
                  className="me-3"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />

                <Button type="submit">Search</Button>

              </Form>
              </Col>



              

            </div>
          );
    
}