import {
  Row,
  Col,
  Button,
  Table,
  Modal,
  Container,
} from "react-bootstrap";
import { useState, useContext } from "react";
import { EditParcel } from "./edit";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";
import { useSnackbar } from "notistack";

export function ViewAll({currentPage}) {
  const {fetchParcel, filtered,} =
    useContext(UserContext);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("");

  const [modelDeleteShow, setModelDeleteShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteMessage = "Deleted Successfully!";
  const updateMessage = "Updated Successfully!";

  //handle model for edit section
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setSelect(data);
  };

  //handle model for delete section
  const handleDeleteClose = () => setModelDeleteShow(false);
  const handleDeleteShow = (data) => {
    setModelDeleteShow(true);
    setSelect(data);
  };

  const navi = useNavigate();

  //interect with server for edited data
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
        enqueueSnackbar(updateMessage, { variant: "success" });
        navi("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //interect with server for deleted data
  const handleDelete = async () => {
    try {
      const response = await axiosConfig.delete(
        `/admin/delete/${select._id}`,
        select,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchParcel();
        handleDeleteClose();
        enqueueSnackbar(deleteMessage, { variant: "success" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
        <Table striped="columns" bordered>
          <thead>
            <tr>
              <th>No : </th>
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
          {filtered.length > 0 && filtered[currentPage] ? (
            filtered[currentPage].data.map((data, i) => (
              <tbody key={`${data.trackingNo}-${i}`} className="text-center">
                <tr>
                  <td>{(i+1) % 10 === 0  ? currentPage*10+i+1 : `${currentPage}`+(i+1)}</td>
                  <td>{data.trackingNo}</td>
                  <td>{data.description}</td>
                  <td>{data.weight} kg</td>
                  <td>{data.unit} pcs</td>
                  <td>{data.origin}</td>
                  <td>{data.destination}</td>
                  <td>{data.currentLocation}</td>
                  <td>{data.status}</td>

                  <td>
                    <Col className="d-flex">
                      <Button
                        variant="primary"
                        onClick={() => handleShow(data)}
                        className="d-flex align-items-center justify-content-center me-2"
                      >
                        <i className="bx bx-edit bx-sm"></i>
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDeleteShow(data)}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="bx bx-trash bx-sm"></i>
                      </Button>
                    </Col>
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

      {/* Modal delete */}
      <Modal
        show={modelDeleteShow}
        onHide={handleDeleteClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Deleting tracking no. {select.trackingNo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confrim to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
