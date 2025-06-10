import React from 'react';
import emptyImg from '../assets/empty.png';

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm }) => (
  <div className="text-center py-12">
    {searchTerm ? (
      <div className="text-gray-500 dark:text-gray-400">No notes match your search</div>
    ) : (
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <img
            src={emptyImg}
            alt="Empty state illustration"
            width={200}
            height={150}
            className="mx-auto"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="text-gray-900 dark:text-gray-100 text-2xl font-bold">Empty...</div>
      </div>
    )}
  </div>
);

export default EmptyState;