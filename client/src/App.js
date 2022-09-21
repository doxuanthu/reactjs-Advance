import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Store } from "./pages";
import { useAuth } from "./hooks/hooks";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ModalChangePassword from "./components/ModalChangePassword/ModalChangePassword";

function App() {
  const { user } = useAuth();
  useEffect(() => {
    console.log({ user });
  }, [user]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      {user && <ModalChangePassword />}
    </>
  );
}

export default App;
