import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFetchTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from './features/todo/todoApi';
import {
  setSearchTerm,
  setFilter,
  setEditing,
  setEditText,
  setShowModal,
  setNewNoteText,
  setDarkMode,
} from './features/todo/uiSlice';
import type { RootState } from './store';
import { Search, Plus, Moon, Sun } from 'lucide-react';
import TodoList from './Components/TodoList';
import EmptyState from './Components/EmptyState';
import Modal from './Components/Modal';

function App() {
  const dispatch = useDispatch();
  const {
    searchTerm,
    filter,
    editingId,
    editText,
    showModal,
    newNoteText,
    darkMode,
  } = useSelector((state: RootState) => state.ui);

  const { data: todos = [], isLoading } = useFetchTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // Remove dark mode effect
  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', darkMode);
  // }, [darkMode]);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'COMPLETED' && todo.completed) ||
      (filter === 'ACTIVE' && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  const handleAddNote = async () => {
    if (newNoteText.trim()) {
      await addTodo(newNoteText.trim());
      dispatch(setNewNoteText(''));
      dispatch(setShowModal(false));
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    await toggleTodo({ id, completed: !completed });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  const handleStartEditing = (id: string, description: string) => {
    dispatch(setEditing({ id, text: description }));
  };

  const handleSaveEdit = async (id: string) => {
    await updateTodo({ id, description: editText });
    dispatch(setEditing(null));
  };

  const handleCancelEdit = () => {
    dispatch(setEditing(null));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-8 transition-colors">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 transition-colors">
        <div className="p-6 border-b border-gray-100 transition-colors">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 transition-colors">TODO LIST</h1>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search note..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 transition-colors"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value as any))}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            >
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => dispatch(setDarkMode(!darkMode))}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="p-6 transition-colors">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredTodos.length > 0 ? (
            <TodoList
              todos={filteredTodos}
              editingId={editingId}
              editText={editText}
              toggleTodo={handleToggleTodo}
              startEditing={handleStartEditing}
              saveEdit={handleSaveEdit}
              cancelEdit={handleCancelEdit}
              setEditText={(text) => dispatch(setEditText(text))}
              deleteTodo={handleDeleteTodo}
            />
          ) : (
            <EmptyState searchTerm={searchTerm} />
          )}
        </div>

        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => dispatch(setShowModal(true))}
            className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <Modal
          show={showModal}
          newNoteText={newNoteText}
          setNewNoteText={(text) => dispatch(setNewNoteText(text))}
          onClose={() => dispatch(setShowModal(false))}
          onApply={handleAddNote}
        />
      </div>
    </div>
  );
}

export default App;