/* eslint-disable import/no-cycle */
import api from './api';

export const TOKEN_KEY = '@admin-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = async () => {
  try {
    const token = getToken();

    if (!token) throw Error('No token provided');

    await api.get('private/authenticate');
  } catch (error) {
    console.log(error);
    throw Error('No token provided');
  }
};
