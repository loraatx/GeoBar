
import React from 'react';
import type { UserProfile } from '../types';
import { UserProfileCard } from './UserProfileCard';

interface UserGridProps {
  users: UserProfile[];
}

export const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">It's a bit quiet here... be the first to start the party!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {users.map((user) => (
        <UserProfileCard key={user.id} user={user} />
      ))}
    </div>
  );
};
