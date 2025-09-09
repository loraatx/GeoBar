
import React from 'react';
import type { UserProfile } from '../types';

interface UserProfileCardProps {
  user: UserProfile;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <div className="relative group flex flex-col items-center p-4 bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transform hover:-translate-y-1">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 group-hover:border-purple-500 transition-colors duration-300"
      />
      <h3 className="mt-4 text-md font-bold text-center text-white">{user.name}</h3>
      <p className="mt-1 text-xs text-center text-gray-400 leading-tight">{user.bio}</p>
    </div>
  );
};
