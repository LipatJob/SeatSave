import { authService } from './authService';

const userType = 'visitor';
export const visitorAuthService = {
  login: (email, password) => authService.getUser(email, password, userType),
  logout: () => authService.getUser(userType),
  getUser: () => authService.getUser(userType),
};
