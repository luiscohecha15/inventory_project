import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import CreateCategory from './pages/CreateCategory';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Inventory</h1>
        <nav style={{ marginBottom: 10 }}>
          <Link to="/">Products</Link> | <Link to="/products/new">Create Product</Link> | <Link to="/categories/new">Create Category</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/new" element={<CreateProduct />} />
          <Route path="/categories/new" element={<CreateCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
