
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { LocationSimulator } from './components/LocationSimulator';
import { VenueList } from './components/VenueList';
import { UserGrid } from './components/UserGrid';
import { GEOFENCES, MOCK_USERS_BY_VENUE } from './constants';
import { isInsideGeofence } from './services/locationService';
import type { Coordinates, Geofence, UserProfile } from './types';
import { MapPinIcon } from './components/icons/MapPinIcon';
import { AlertTriangleIcon } from './components/icons/AlertTriangleIcon';

type LocationStatus = 'IDLE' | 'REQUESTING' | 'TRACKING' | 'ERROR';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [activeGeofence, setActiveGeofence] = useState<Geofence | null>(null);
  const [usersInGeofence, setUsersInGeofence] = useState<UserProfile[]>([]);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('IDLE');
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // To prevent simulator updates from being immediately overwritten by watchPosition
  const isSimulating = useRef(false);
  const simulationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkGeofence = useCallback((location: Coordinates) => {
    setIsLoading(true);
    let foundGeofence: Geofence | null = null;
    for (const fence of GEOFENCES) {
      if (isInsideGeofence(location, fence.location, fence.radius)) {
        foundGeofence = fence;
        break;
      }
    }
    
    setTimeout(() => { // Simulate network delay
        setActiveGeofence(foundGeofence);
        if (foundGeofence) {
            setUsersInGeofence(MOCK_USERS_BY_VENUE[foundGeofence.id] || []);
        } else {
            setUsersInGeofence([]);
        }
        setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('ERROR');
      setLocationError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    setLocationStatus('REQUESTING');
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (isSimulating.current) return; // If simulating, ignore real location updates

        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        if (locationStatus !== 'TRACKING') {
            setLocationStatus('TRACKING');
        }
        setLocationError(null);
      },
      (error) => {
        setLocationStatus('ERROR');
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable it in your browser settings to use the app.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is currently unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('The request to get your location timed out.');
            break;
          default:
            setLocationError('An unknown error occurred while getting your location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      if (simulationTimeout.current) {
        clearTimeout(simulationTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentLocation) {
        checkGeofence(currentLocation);
    }
  }, [currentLocation, checkGeofence]);

  const handleLocationChange = (newLocation: Coordinates) => {
    isSimulating.current = true;
    setCurrentLocation(newLocation);
    setLocationStatus('TRACKING'); // Treat simulation as successful tracking
    setLocationError(null);
    
    if (simulationTimeout.current) {
      clearTimeout(simulationTimeout.current);
    }

    // Ignore real location updates for 10 seconds after simulating
    simulationTimeout.current = setTimeout(() => {
      isSimulating.current = false;
    }, 10000); 
  };

  const renderContent = () => {
    if (locationStatus === 'REQUESTING') {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-xl text-gray-300">Requesting location access...</p>
          <p className="text-sm text-gray-500 mt-2">Please allow location services to find nearby venues.</p>
        </div>
      );
    }

    if (locationStatus === 'ERROR') {
      return (
        <div className="text-center p-6 bg-red-900/20 rounded-lg mt-10 border border-red-700 flex flex-col items-center gap-4">
          <AlertTriangleIcon className="h-10 w-10 text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-red-400">Location Unavailable</h2>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">{locationError}</p>
          </div>
        </div>
      );
    }

    // FIX: Simplified the condition. The check `locationStatus !== 'REQUESTING'`
    // is redundant because the preceding `if` block already handles the 'REQUESTING' state.
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mb-4"></div>
          <p className="text-xl text-gray-300">Checking your location against our venues...</p>
        </div>
      );
    }
    
    if (activeGeofence) {
      return (
        <div>
          <div className="text-center p-6 bg-gray-800/50 rounded-lg mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-green-400">You're at {activeGeofence.name}!</h2>
            <p className="text-gray-400 mt-2">Check out who's here right now.</p>
          </div>
          <UserGrid users={usersInGeofence} />
        </div>
      );
    }

    if (locationStatus === 'TRACKING' && !activeGeofence) {
      return (
        <div>
          <div className="text-center p-6 bg-red-900/20 rounded-lg mb-8 border border-red-700">
            <h2 className="text-3xl font-bold text-red-400">You're Not at The Spot</h2>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
              <MapPinIcon />
              Head to one of our partner bars to join the scene!
            </p>
          </div>
          <VenueList venues={GEOFENCES} />
        </div>
      );
    }

    return null; // Fallback for initial idle state
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <LocationSimulator onLocationChange={handleLocationChange} venues={GEOFENCES} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;