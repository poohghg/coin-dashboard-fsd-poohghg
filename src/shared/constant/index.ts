export const IS_NODE = typeof window === 'undefined';

export const USE_MOCK = true;

export const MOCK_API_URL = process.env.MOCK_API_URL || ' http://localhost:3000';

export const API_URL = process.env.API_URL || '';

export const SOCKET_URL = process.env.SOCKET_URL || 'ws://localhost:3000/socket';
