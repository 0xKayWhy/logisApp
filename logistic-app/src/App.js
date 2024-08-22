import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./components/admin/admin";
import Tracking from "./components/track/trackPage";
import MainPage from "./components/mainPage";
import Register from "./users/register";
import Login from "./users/login";
import { DeliveryGuyPage } from "./components/deliveryGuy/deliveryGuy";
import { NavigationBar } from "./components/navbar";
import { NotFound } from "./components/notFound";
import { ProtectedRoute } from "./components/protectedRoute";
import { PageCount } from "./components/pageCount";
import { Container, Col } from "react-bootstrap";

function App() {
  return (
<Container fluid className="overflow__disable p-0">
  <NavigationBar />
  <Col>
    <Routes>
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin" replace><AdminPage /></ProtectedRoute>} />
      <Route path="/deliveryguy" element={<ProtectedRoute requiredRole="deliveryguy" replace><DeliveryGuyPage /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/track/:trackingId?" element={<Tracking />} />
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Col>
</Container>
  );
}

export default App;
