import Router from 'next/router';
import authService from './authService';

const userGroup = 'Visitor';
export default {
  login: (email, password) => authService.login(email, password, userGroup),
  logout: () => {
    authService.logout(userGroup);
    Router.push('/login');
  },
  getUser: () => authService.getUser(userGroup),
  isLoggedIn: () => authService.isLoggedIn(userGroup),
  getToken: () => authService.getToken(userGroup),
  getAuthToken: () => authService.getAuthToken(userGroup),
};
