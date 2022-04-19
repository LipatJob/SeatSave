import { authService } from './authService';

const userGroup = 'Visitor';
export const visitorAuthService = {
  login: (email, password) => authService.login(email, password, userGroup),
  logout: () => authService.logout(userGroup),
  getUser: () => authService.getUser(userGroup),
};
