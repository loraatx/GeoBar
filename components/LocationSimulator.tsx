
import React from 'react';
import type { Coordinates, Geofence } from '../types';

interface LocationSimulatorProps {
  onLocationChange: (location: Coordinates) => void;
  venues: Geofence[];
}

// A point far away from any geofence
const OUTSIDE_LOCATION: Coordinates = { latitude: 34.052235, longitude: -118.243683 }; // Downtown LA

export const LocationSimulator: React.FC<LocationSimulatorProps> = ({ onLocationChange, venues }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-center mb-3 text-gray-300">Location Simulator</h3>
      <p className="text-center text-sm text-gray-500 mb-4">Click a button to "teleport" to a location and see the app update.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {venues.map((venue) => (
          <button
            key={venue.id}
            onClick={() => onLocationChange(venue.location)}
            className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Go to {venue.name}
          </button>
        ))}
        <button
          onClick={() => onLocationChange(OUTSIDE_LOCATION)}
          className="w-full px-4 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Go Somewhere Else
        </button>
      </div>
    </div>
  );
};
