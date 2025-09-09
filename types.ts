
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Geofence {
  id: string;
  name: string;
  address: string;
  location: Coordinates;
  radius: number; // in meters
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}
