import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getAllExpenses = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/despesas?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const getExpenseById = async (id: number) => {
  const response = await api.get(`/despesas/${id}`);
  const data = response.data.data;

  // Formata a data para "yyyy-MM-dd"
  const formattedDate = data.date ? data.date.substring(0, 10) : '';

  const location = data.location
    ? {
        address: data.location.address || '',
        number: data.location.number || '',
        neighborhood: data.location.neighborhood || '',
        city: data.location.city || '',
        state: data.location.state || '',
        complement: data.location.complement || '',
        zipCode: data.location.zipCode || '',
      }
    : {
        address: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
        zipCode: '',
      };

  return {
    description: data.description || '',
    value: data.value || '',
    date: formattedDate,
    categoryId: data.category?.id?.toString() || '',
    paymentTypeId: data.paymentType?.id?.toString() || '',
    location,
  };
};

export const createExpense = async (data: any) => {
  const response = await api.post('/despesas', data);
  return response.data;
};

export const updateExpense = async (id: number, data: any) => {
  const response = await api.put(`/despesas/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: number) => {
  const response = await api.delete(`/despesas/${id}`);
  return response.data;
};
