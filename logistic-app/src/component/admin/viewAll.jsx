import { Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { useState, useEffect ,useContext} from "react";
import { EditParcel } from "./edit";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";
export function ViewAll() {
  const {allParcels, updateData} = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(undefined);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(allParcels);



  const handleClose = () => setShow(false);
  const handleShow = (datas) => {
    setShow(true);
    setSelect(datas);
  };

  const navi = useNavigate();

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    try {
        
      const response = await axiosConfig.put(
        `/admin/edit/${values._id}`,
        values,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        updateData()
        navi("/admin");
        

      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    const searchResult = allParcels.filter((item) => {
      const trackingNo = String(item.trackingNo);
      return trackingNo.includes(search);
    });
    setResult(searchResult);
    setSearch("")
  };

  const handleDelete = async (datas) => {
    try {
      setSelect(datas);
      const response = await axiosConfig.delete(
        `/admin/delete/${datas._id}`,
        datas,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        updateData()
        navi("/admin");
        

      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setResult(allParcels); 

  }, [allParcels]);

  return (
    <Col>
      <Row>
        <Col sm={4} className="mb-4">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Tracking Number"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Form>
        </Col>
      </Row>
      <Table striped="columns" bordered>
        <thead>
          <tr>
            <th>Tracking No : </th>
            <th>Description : </th>
            <th>Weight : </th>
            <th>Unit : </th>
            <th>Origin : </th>
            <th>Destination : </th>
            <th>Current Location : </th>
            <th>Status : </th>
            <th>Action : </th>
          </tr>
        </thead>
        {result.map((datas) => (
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

              <td>
                <Button variant="primary" onClick={() => handleShow(datas)}>
                  Edit
                </Button>

                <Button variant="danger" onClick={() => handleDelete(datas)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* Modal Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditParcel
            selectEdit={select}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
}
