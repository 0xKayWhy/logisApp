import { Row, Col, Button, Table, Modal, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { EditParcel } from "./edit";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";

export function ViewAll() {
  const { allParcels, fetchParcel } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(undefined);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState(allParcels);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setSelect(data);
  };

  const navi = useNavigate();

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.put(
        `/admin/edit/${values._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchParcel();
        navi("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (data) => {
    try {
      setSelect(data);
      const response = await axiosConfig.delete(
        `/admin/delete/${data._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchParcel();
        navi("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filterParcel = () => {
    const newValue = filtered.filter((parcel) => parcel.trackingNo == filter);
    if (newValue.length === 0) {
      setFiltered([])
      return;
    }
    setFiltered(newValue);
  };

  useEffect(() => {
    setFiltered(allParcels);
  }, [allParcels]);

  useEffect(() => {
    if (filter.length === 0) {
      setFiltered(allParcels);
    }
  }, [filter]);

  return (
    <Col>
      <Row>
        <Col sm={4} className="mb-4">
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
              className="me-2"
              aria-label="Search"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <Button type="submit">Search</Button>
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
        {filtered.length > 0 ? (
          filtered.map((data) => (
            <tbody key={data.trackingNo} className="mb-3">
              <tr>
                <td>{data.trackingNo}</td>
                <td>{data.description}</td>
                <td>{data.weight} kg</td>
                <td>{data.unit} pcs</td>
                <td>{data.origin}</td>
                <td>{data.destination}</td>
                <td>{data.currentLocation}</td>
                <td>{data.status}</td>

                <td>
                  <Button variant="primary" onClick={() => handleShow(data)}>
                    Edit
                  </Button>

                  <Button variant="danger" onClick={() => handleDelete(data)}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody className="text-center">
            <tr>
              <td colSpan="9">Parcel Not Found</td>
            </tr>
          </tbody>
        )}
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
