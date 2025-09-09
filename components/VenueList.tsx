
import React from 'react';
import type { Geofence } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';

interface VenueListProps {
  venues: Geofence[];
}

export const VenueList: React.FC<VenueListProps> = ({ venues }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-300">Our Partner Venues</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            <h4 className="text-xl font-bold text-purple-400">{venue.name}</h4>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              {venue.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
