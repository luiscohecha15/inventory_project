import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {
  const [name,setName]=useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name });
      nav('/');
    } catch (err) {
      alert('Error creating category');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={submit}>
        <div><label>Name: <input value={name} onChange={e=>setName(e.target.value)} required /></label></div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
