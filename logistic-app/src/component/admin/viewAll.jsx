import { Row, Col, Button, Table, Modal, Form, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { EditParcel } from "./edit";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";
import { useSnackbar } from "notistack";

export function ViewAll() {
  const { allParcels, fetchParcel, oriData } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("");
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modelDeleteShow, setModelDeleteShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteMessage = "Deleted Successfully!";
  const updateMessage = "Updated Successfully!";

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setSelect(data);
  };

  const handleDeleteClose = () => setModelDeleteShow(false);
  const handleDeleteShow = (data) => {
    setModelDeleteShow(true);
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
        enqueueSnackbar(updateMessage, { variant: "success" });
        navi("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  useEffect(() => {
    setFiltered(allParcels);
  }, [allParcels]);

  useEffect(() => {
    if (filter.length === 0) {
      setFiltered(allParcels);
    }
  }, [filter]);

  return (
    <Container>
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
            <Button
              type="submit"
              className="d-flex justify-content-center align-items-center"
            >
              <i className="bx bx-search-alt bx-sm"></i>
            </Button>
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
          filtered[currentPage].data.map((data, i) => (
            <tbody key={`${data.trackingNo}-${i}`} className="mb-3">
              <tr>
                <td>{data.trackingNo}</td>
                <td>{data.description}</td>
                <td>{data.weight} kg</td>
                <td>{data.unit} pcs</td>
                <td>{data.origin}</td>
                <td>{data.destination}</td>
                <td>{data.currentLocation}</td>
                <td>{data.status}</td>

                <td><Col className="d-flex">
                  <Button variant="primary" onClick={() => handleShow(data)} className="d-flex align-items-center justify-content-center me-2">
                  <i className='bx bx-edit bx-sm' ></i>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDeleteShow(data)}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className='bx bx-trash bx-sm'></i>
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
      <Row className="d-flex mt-auto">
        <Col onClick={handlePrevious} xs={4} md={5} className="text-end justify-content-center align-items-center"><i className='bx bx-chevron-left bx-sm'></i></Col>
        <Col xs={4} md={1} className="text-center">{currentPage + 1}</Col>
        <Col onClick={handleNext} xs={4} md={5}className="justify-content-center align-items-center"><i className='bx bx-chevron-right bx-sm'></i></Col>
      </Row>

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
    </Col>
    </Container>
  );
}
