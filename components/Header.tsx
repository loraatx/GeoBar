
import React from 'react';
import { UsersIcon } from './icons/UsersIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
          <UsersIcon className="h-8 w-8 text-purple-400" />
        </div>
        <div>
           <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            GeoBar Connect
          </h1>
          <p className="text-gray-400 mt-1">Be where the people are.</p>
        </div>
      </div>
    </header>
  );
};
