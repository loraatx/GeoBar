
import type { Coordinates } from '../types';

/**
 * Calculates the distance between two geographical points using the Haversine formula.
 * @param point1 - The first point with latitude and longitude.
 * @param point2 - The second point with latitude and longitude.
 * @returns The distance in meters.
 */
function getDistanceInMeters(point1: Coordinates, point2: Coordinates): number {
  const R = 6371e3; // Earth's radius in meters
  const lat1Rad = (point1.latitude * Math.PI) / 180;
  const lat2Rad = (point2.latitude * Math.PI) / 180;
  const deltaLatRad = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const deltaLonRad = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Checks if a user's location is within a given geofence.
 * @param userLocation - The user's coordinates.
 * @param geofenceCenter - The geofence's center coordinates.
 * @param radiusInMeters - The geofence's radius in meters.
 * @returns True if the user is inside the geofence, false otherwise.
 */
export function isInsideGeofence(
  userLocation: Coordinates,
  geofenceCenter: Coordinates,
  radiusInMeters: number
): boolean {
  const distance = getDistanceInMeters(userLocation, geofenceCenter);
  return distance <= radiusInMeters;
}
