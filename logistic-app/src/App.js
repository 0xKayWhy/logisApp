import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./component/admin/admin";
import Tracking from "./component/track/trackPage";
import MainPage from "./component/mainPage";
import Register from "./users/register";
import Login from "./users/login";
import { DeliveryGuyPage } from "./component/deliveryGuy/deliveryGuy";
import { NavigationBar } from "./component/navbar";
import { NotFound } from "./component/notFound";
import { ProtectedRoute } from "./component/protectedRoute";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin" replace>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deliveryguy"
          element={
            <ProtectedRoute requiredRole="deliveryguy" replace>
              <DeliveryGuyPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track/:trackingId?" element={<Tracking />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
