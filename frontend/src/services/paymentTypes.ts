import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getAllPaymentTypes = async () => {
  const response = await api.get(`/tipos-de-pagamento`);
  return response.data;
};