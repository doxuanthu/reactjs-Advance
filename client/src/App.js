import { Routes, Route } from "react-router-dom";
import { Home, Product } from "./pages";
import AddForm from "./components/AddForm/AddForm";
import EditForm from "./components/EditForm/EditForm";
import Store from "./pages/Store/Store";
import { default as StoreAddForm } from "./pages/Store/AddForm";
import { default as StoreEditForm } from "./pages/Store/EditForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/new" element={<AddForm />} />
      <Route path="/products/edit/:id" element={<EditForm />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:section/new/" element={<StoreAddForm />} />
      <Route path="/store/:section/edit/:id" element={<StoreEditForm />} />
    </Routes>
  );
}

export default App;
