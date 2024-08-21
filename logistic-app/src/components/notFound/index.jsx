import { useContext } from "react";
import "./index.css";
import { Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserContext } from "../userContext";

//display 404 whenever user search for undefined path
export const NotFound = () => {
  const {role} = useContext(UserContext)

  return (
    <div className="not-found-container">
      <h1 className="fst-italic font-monospace fw-bold mb-5">
        404 - Page Not Found
      </h1>
      <NavLink to={`/${role ? role : ""}`}>
      <Button>Back to {role ? (role === "deliveryguy" ? "Delivery" : "Admin") : "Home"}</Button>
      </NavLink>
      <Image className="mt-5" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW11bnE0djkyaGs3NWdhMXRna2Y0dzExd2VjMXRydjZ6amhrbTc0ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif" alt="rickRolled"/>
    </div>
  );
};
