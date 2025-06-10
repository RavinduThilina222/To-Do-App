import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface Todo {
  _id: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  editingId: string | null;
  editText: string;
  toggleTodo: (id: string, completed: boolean) => void;
  startEditing: (id: string, description: string) => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
  setEditText: (text: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  editingId,
  editText,
  toggleTodo,
  startEditing,
  saveEdit,
  cancelEdit,
  setEditText,
  deleteTodo,
}) => (
  <div className="space-y-3">
    {todos.map((todo) => (
      <div
        key={todo._id}
        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <button
          onClick={() => toggleTodo(todo._id, todo.completed)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        {editingId === todo._id ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo._id)}
              autoFocus
            />
            <button
              onClick={() => saveEdit(todo._id)}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span className={`flex-1 font-medium ${
              todo.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-100'
            }`}>
              {todo.description}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => startEditing(todo._id, todo.description)}
                className="p-1 text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="p-1 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
);

export default TodoList;