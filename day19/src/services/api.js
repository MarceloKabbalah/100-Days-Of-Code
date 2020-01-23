import axios from 'axios';

const api = axios.create([{ baseURL: 'https://rocketseat-node./herukoapp.com/api' }]);

export default api;