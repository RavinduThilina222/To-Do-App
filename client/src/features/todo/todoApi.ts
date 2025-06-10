import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  _id: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation<Todo, string>({
      query: (description) => ({
        url: '/todos',
        method: 'POST',
        body: { description },
      }),
      invalidatesTags: ['Todos'],
    }),
    toggleTodo: builder.mutation<void, { id: string; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: { completed },
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<void, { id: string; description: string }>({
      query: ({ id, description }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: { description },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;