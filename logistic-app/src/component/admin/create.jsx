import { Form, Col, Button, InputGroup, Container } from "react-bootstrap";
import { useState , useContext} from "react";
import axiosConfig from "../../config/axios";
import { UserContext } from "../userContext";
import { useSnackbar } from "notistack";

export function CreateParcel() {
  const [values, setValues] = useState({
    description: "",
    weight: "",
    unit: "",
    origin: "",
    destination: "",
  });

  const {fetchParcel} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar()

  const createMessage = "Created Successfully!"

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

  const handleChange = (item) => (e) => {
    setValues((prevState) => ({ ...prevState, [item]: e.target.value }));
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
        fetchParcel();
        enqueueSnackbar(createMessage , {variant : "success"})

      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
    <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="description.id">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            onChange={handleChange("description")}
            value={values.description}
            maxLength={30}
          />
        </Form.Group>
        <Form.Label id="weight.id">Weight</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            htmlFor="weight.id"
            required
            onChange={handleChange("weight")}
            value={values.weight}
            maxLength={4}
          />
          <InputGroup.Text>kg</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
        <Form.Label id="unit.id">Unit</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            htmlFor="unit.id"
            required
            onChange={handleChange("unit")}
            value={values.unit}
            maxLength={3}
          />
          <InputGroup.Text>pcs</InputGroup.Text>
        </InputGroup>

        <Form.Group className="mb-3" controlId="origin.id">
          <Form.Label>Origin</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            onChange={handleChange("origin")}
            value={values.origin}
          >
            <option value="">Please select</option>
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
            onChange={handleChange("destination")}
            value={values.destination}
            required
          >
            <option value="">Please select</option>
            {allStation.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="mb-3">Create</Button>
      </Form>
    </Col>
    </Container>
  );
}
