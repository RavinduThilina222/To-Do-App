import React from 'react';
import emptyImg from '../assets/empty.png';

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm }) => (
  <div className="text-center py-12">
    {searchTerm ? (
      <div className="text-gray-500 dark:text-gray-400 text-lg">No notes match your search</div>
    ) : (
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <img
            src={emptyImg}
            alt="Empty state illustration"
            width={200}
            height={150}
            className="mx-auto opacity-80"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="text-gray-900 dark:text-white text-3xl font-bold">Empty...</div>
      </div>
    )}
  </div>
);

export default EmptyState;