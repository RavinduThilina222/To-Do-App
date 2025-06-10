import React from 'react';

interface ModalProps {
  show: boolean;
  newNoteText: string;
  setNewNoteText: (text: string) => void;
  onClose: () => void;
  onApply: () => void;
}

const Modal: React.FC<ModalProps> = ({
  show,
  newNoteText,
  setNewNoteText,
  onClose,
  onApply,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-300/60 dark:bg-gray-900/80 flex items-center justify-center z-50 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl transition-colors">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">NEW NOTE</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Input your note..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-400 rounded-lg focus:outline-none focus:border-blue-500 transition-colors dark:bg-gray-900 dark:text-gray-100"
            onKeyPress={(e) => e.key === 'Enter' && onApply()}
            autoFocus
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium"
          >
            CANCEL
          </button>
          <button
            onClick={onApply}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;