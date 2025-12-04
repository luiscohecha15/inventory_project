import axios from 'axios';

// Allow overriding the API base URL via Vite env variable `VITE_API_URL`.
// When built with Docker, we set the build ARG `VITE_API_URL` so Vite will
// replace `import.meta.env.VITE_API_URL` at build time.
const DEFAULT_BASE = 'http://localhost:3000/api';
const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : DEFAULT_BASE;

const api = axios.create({ baseURL: base, timeout: 5000 });
export default api;
