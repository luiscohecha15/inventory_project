import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const [name,setName]=useState('');
  const [price,setPrice]=useState(0);
  const [stock,setStock]=useState(0);
  const [description,setDescription]=useState('');
  const [categoryId,setCategoryId]=useState('');
  const [categories,setCategories]=useState([]);
  const nav = useNavigate();

  useEffect(()=>{ api.get('/categories').then(r=>setCategories(r.data)).catch(()=>setCategories([])); },[]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price: Number(price), stock: Number(stock), description, category_id: categoryId });
      nav('/');
    } catch (err) {
      alert('Error creating product. See console.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={submit}>
        <div><label>Name: <input value={name} onChange={e=>setName(e.target.value)} required /></label></div>
        <div><label>Description: <input value={description} onChange={e=>setDescription(e.target.value)} /></label></div>
        <div><label>Price: <input type="number" value={price} onChange={e=>setPrice(e.target.value)} required /></label></div>
        <div><label>Stock: <input type="number" value={stock} onChange={e=>setStock(e.target.value)} required /></label></div>
        <div>
          <label>Category:
            <select value={categoryId} onChange={e=>setCategoryId(e.target.value)} required>
              <option value="">-- select --</option>
              {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
