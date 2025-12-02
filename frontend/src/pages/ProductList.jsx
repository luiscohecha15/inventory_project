import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const load = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (e) {
      console.error(e);
      setProducts([]);
    }
  };
  useEffect(() => { load(); }, []);
  return (
    <div>
      <h2>Products</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category_id?.name || '—'}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
