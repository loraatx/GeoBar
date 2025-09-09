
import type { Geofence, UserProfile } from './types';

export const GEOFENCES: Geofence[] = [
  {
    id: 'the-tipsy-turtle',
    name: 'The Tipsy Turtle',
    address: '123 Ocean Ave, Miami, FL',
    location: { latitude: 25.790654, longitude: -80.130045 },
    radius: 100, // 100 meters
  },
  {
    id: 'the-velvet-lounge',
    name: 'The Velvet Lounge',
    address: '456 Downtown St, New York, NY',
    location: { latitude: 40.712776, longitude: -74.005974 },
    radius: 100,
  },
  {
    id: 'the-rusty-anchor',
    name: 'The Rusty Anchor',
    address: '789 Pier Rd, San Francisco, CA',
    location: { latitude: 37.808674, longitude: -122.409821 },
    radius: 100,
  },
];

const generateUsers = (count: number, prefix: string): UserProfile[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${prefix}-${i + 1}`,
        name: `${prefix} User ${i + 1}`,
        avatarUrl: `https://picsum.photos/seed/${prefix}${i + 1}/200/200`,
        bio: `Just enjoying the vibe at the best spot in town!`,
    }));
};

export const MOCK_USERS_BY_VENUE: { [key: string]: UserProfile[] } = {
    'the-tipsy-turtle': generateUsers(8, 'Turtle'),
    'the-velvet-lounge': generateUsers(12, 'Velvet'),
    'the-rusty-anchor': generateUsers(6, 'Anchor'),
};
