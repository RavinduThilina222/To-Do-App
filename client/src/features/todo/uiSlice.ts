import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// ...rest of your code...
interface UIState {
  searchTerm: string;
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
  editingId: string | null;
  editText: string;
  showModal: boolean;
  newNoteText: string;
  darkMode: boolean;
}

const initialState: UIState = {
  searchTerm: '',
  filter: 'ALL',
  editingId: null,
  editText: '',
  showModal: false,
  newNoteText: '',
  darkMode: localStorage.getItem('theme') === 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setFilter(state, action: PayloadAction<'ALL' | 'ACTIVE' | 'COMPLETED'>) {
      state.filter = action.payload;
    },
    setEditing(state, action: PayloadAction<{ id: string; text: string } | null>) {
      if (action.payload) {
        state.editingId = action.payload.id;
        state.editText = action.payload.text;
      } else {
        state.editingId = null;
        state.editText = '';
      }
    },
    setEditText(state, action: PayloadAction<string>) {
      state.editText = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setNewNoteText(state, action: PayloadAction<string>) {
      state.newNoteText = action.payload;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      localStorage.setItem('theme', action.payload ? 'dark' : 'light');
    },
  },
});

export const {
  setSearchTerm,
  setFilter,
  setEditing,
  setEditText,
  setShowModal,
  setNewNoteText,
  setDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;