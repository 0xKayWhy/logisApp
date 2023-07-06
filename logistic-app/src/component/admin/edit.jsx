import { Form, Col, InputGroup ,Modal, Button} from "react-bootstrap";
import { useState } from "react";

export function EditParcel({ selectEdit, handleSubmit,handleClose }) {
  const [values, setValues] = useState(selectEdit);

  const allStation = [
    "Kuala Lumpur",
    "Sabah",
    "Kelantan",
    "Pahang",
    "Terengganu",
    "Malacca",
    "Sarawak",
    "Negeri Sembilan",
    "Perak",
    "Penang",
    "Selangor",
    "Johor",
    "Kedah",
    "Perlis",
  ];

  const status= ["created", "inProgess", 'delivered']

  const handleForm = (e) => {
    handleSubmit(e,values)
  } 


  const set = (item) => {
    return ({ target: { value } }) => {
      setValues((prevState) => ({ ...prevState, [item]: value }));
    };
  };


  return (
    <Col>
      <Form onSubmit={handleForm}>
        <Form.Group className="mb-3" controlId="description.id">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            onChange={set("description")}
            value={values.description}
          />
        </Form.Group>
        <Form.Label id="weight.id">Weight</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            htmlFor="weight.id"
            required
            onChange={set("weight")}
            value={values.weight}
          />
          <InputGroup.Text>kg</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
        <Form.Label id="unit.id">Unit</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            htmlFor="unit.id"
            required
            onChange={set("unit")}
            value={values.unit}
          />
          <InputGroup.Text>pcs</InputGroup.Text>
        </InputGroup>

        <Form.Group className="mb-3" controlId="origin.id">
          <Form.Label>Origin</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            onChange={set("origin")}
            value={values.origin}
          >
            <option>Please select</option>
            {allStation.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="destination.id">
          <Form.Label>Destination</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={set("destination")}
            value={values.destination}
          >
            <option>Please select</option>
            {allStation.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="currentLocation.id">
          <Form.Label>Current Location</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={set("currentLocation")}
            value={values.currentLocation}
          >
            <option>Please select</option>
            {allStation.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="status.id">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={set("status")}
            value={values.status}
          >
            <option>Please select</option>
            {status.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>

    </Col>
  );
}
