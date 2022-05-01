import Router from 'next/router';
import authService from './authService';

const userGroup = 'Librarian';
export default {
  login: (email, password) => authService.login(email, password, userGroup),
  logout: () => {
    authService.logout(userGroup);
    Router.push('/librarian/login');
  },
  getUser: () => authService.getUser(userGroup),
  isLoggedIn: () => authService.isLoggedIn(userGroup),
  getToken: () => authService.getToken(userGroup),
};
