import { Col } from "react-bootstrap";
import { TrackBar } from "./map/trackBar";

export default function MainPage() {
  
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 className="mb-5">Track and Trace your Parcel</h1>
      <Col>
        <TrackBar />
      </Col>
    </div>
  );
}
