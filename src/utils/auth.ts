import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS, ROUTES } from '@/constants';

export const getDecodedToken = () => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (!token) return null;
  try {
    return jwtDecode<any>(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = () => {
  const decoded = getDecodedToken();
  if (!decoded) return true;
  return decoded.exp < Date.now() / 1000;
};

export const handleLogout = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  window.location.href = ROUTES.LOGIN;
};