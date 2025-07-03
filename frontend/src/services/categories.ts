import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getAllCategories = async () => {
  const response = await api.get(`/categorias`);
  return response.data;
};