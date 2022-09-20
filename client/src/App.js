import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Store } from "./pages";
import Exercise1 from "./pages/Exercise1/Exercise1";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/exercise1"
        element={
          <ProtectedRoute>
            <Exercise1 />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}

export default App;
