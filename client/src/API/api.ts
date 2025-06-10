import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

export const fetchTodos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTodo = async (description: string) => {
  const res = await axios.post(API_URL, { description });
  return res.data;
};

export const toggleTodoCompletion = async (id: string, completed: boolean) => {
  await axios.put(`${API_URL}/${id}/completion`, { completed: !completed });
};

export const deleteTodoById = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTodoDescription = async (id: string, description: string) => {
  await axios.put(`${API_URL}/${id}/description`, { description });
};