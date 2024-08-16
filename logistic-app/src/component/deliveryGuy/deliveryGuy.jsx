import React, {useContext} from "react";
import axiosConfig from "../../config/axios";
import { Container, Row, Col } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../userContext";

export function DeliveryGuyPage() {
  const {loading, assignedParcels ,availableParcels, fetchParcels} = useContext(UserContext)


  const pickupParcel = async (parcelId) => {
    try {
      await axiosConfig.put(
        `/deliveryguy/parcels/${parcelId}/assign`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      fetchParcels();
    } catch (e) {
      console.log(e);
    }
  };

  const deliverParcel = async (parcelId) => {
    try {
      await axiosConfig.put(
        `/deliveryguy/parcels/${parcelId}/delivered`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      fetchParcels();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    
      
      <Container className="mt-3">
        <h3 className="text-center mb-5">Delivery Partner Dashboard</h3>
        <Row>
          <Col md={5}>
            <h3 className="text-center">Your Parcels</h3>
            {loading ? (
              <div className="loading-spinner">
                <SyncLoader color={"#00008B"} loading={loading} />
              </div>
            ) : (
              assignedParcels.map((parcel) => (
                <div key={parcel._id} className="col card text-dark border-dark mb-3 text-center">
                  <div className="card-body">
                    <h5 className="card-title"><b>{parcel.description}</b></h5>
                    <p className="card-text">Pickup at {parcel.origin}</p>
                    <p className="card-text">Deliver to {parcel.destination}</p>
                    <p className="card-text">Status: {parcel.status}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => deliverParcel(parcel._id)}
                    >
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              ))
              
            )}
          </Col>
          <Col md={5}>
            <h3 className="text-center">Parcels available for Pickup</h3>
            {loading ? (
              <div className="loading-spinner">
                <SyncLoader color={"#00008B"} loading={loading} />
              </div>
            ) : (
              availableParcels.map((parcel) => (
                <div key={parcel._id} className="col card text-dark border-dark mb-3 text-center">
                  <div className="card-body">
                    <h5 className="card-title"><b>{parcel.description}</b></h5>
                    <p className="card-text">Pickup at {parcel.origin}</p>
                    <p className="card-text">Deliver to {parcel.destination}</p>
                    <p className="card-text">Status: {parcel.status}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => pickupParcel(parcel._id)}
                    >
                      Pickup Parcel
                    </button>
                  </div>
                </div>
              ))
            )}
          </Col>
        </Row>
      </Container>

  );
}
