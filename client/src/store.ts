import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './features/todo/todoApi';
import uiReducer from './features/todo/uiSlice';

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;