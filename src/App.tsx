import React from "react";
import ProductList from "@eli/components/product";
import ContactUser from "@eli/components/ContactUser";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div className="mt-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/Quiz4" element={<ContactUser />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
