import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";

export function CreateParcel() {
  const [values, setValues] = useState({
    description: "",
    weight: "",
    unit: "",
    origin: "",
    destination: "",
  });

  const [flashMessage, setFlashMessage] = useState("");
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const {updateData,token} = useContext(UserContext)

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

  const navi = useNavigate();

  const set = (item) => {
    return ({ target: { value } }) => {
      setValues((prevState) => ({ ...prevState, [item]: value }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post("/admin/create", values,{
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setValues({
        description: "",
        weight: "",
        unit: "",
        origin: "",
        destination: "",
      });
      if (response.status === 200) {
        setFlashMessage("Parcel created successfully!"); 
        setShowFlashMessage(true);
        updateData();
        navi("/admin");
        setTimeout(() => {
            setShowFlashMessage(false);
          }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" className="mb-3">Create</Button>
      </Form>
      {showFlashMessage && <div className="flash-message">{flashMessage}</div>}
    </Col>
  );
}
