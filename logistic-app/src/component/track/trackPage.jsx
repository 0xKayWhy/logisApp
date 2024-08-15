import { Row, Col, Container, Table} from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../userContext";
import Map from "./map";
import { useParams } from "react-router-dom";
import { TrackBar } from "./trackBar";

export default function TrackPage() {
  const {setSearch, handleSearch, mapRoute, result } = useContext(UserContext);
  const [map, setMap] = useState("");
  const {trackingId} = useParams()
  
  useEffect(() => {
    if (trackingId) {
      setSearch(trackingId);
      handleSearch(trackingId);
    }
  }, [trackingId]);

  useEffect(() => {
    if (result.length > 0) {
      const firstResult = result[0];
      const searchMap = mapRoute.find((map) =>
        map.hasOwnProperty(firstResult.currentLocation)
      );
      const searchValue = searchMap
        ? searchMap[firstResult.currentLocation]
        : undefined;
      setMap(searchValue);
    }
  }, [result, mapRoute]);

  return (
    <Container>
      <Row>
        <Row>
          <Col className="mb-3 mt-5">
            <h1>Track and Trace</h1>
            </Col>
        </Row>
        <Col>
        <h3>Shipping Details
          </h3></Col>
        <Col>
          <Row>
            <Col lg={6} className="mb-4">
                <TrackBar />
            </Col>
          </Row>
        </Col>
        <Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Tracking No:</th>
                <th>Description:</th>
                <th>Weight:</th>
                <th>Unit:</th>
                <th>Origin:</th>
                <th>Destination:</th>
                <th>Current Location:</th>
                <th>Status:</th>
              </tr>
            </thead>
            {result.length > 0 ? (
              result.map((datas) => (
                <tbody key={datas.trackingNo} className="mb-3">
                  <tr>
                    <td>{datas.trackingNo}</td>
                    <td>{datas.description}</td>
                    <td>{datas.weight} kg</td>
                    <td>{datas.unit} pcs</td>
                    <td>{datas.origin}</td>
                    <td>{datas.destination}</td>
                    <td>{datas.currentLocation}</td>
                    <td>{datas.status}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody className="text-center">
                <tr>
                  <td colSpan="8">Parcel Not Found</td>
                </tr>
              </tbody>
            )}
          </Table>
        </Row>
        <Row className="mt-5 text-center">
          {result.length > 0 && result[0].currentLocation && <Map map={map} />}
        </Row>
      </Row>
    </Container>
  );
}
