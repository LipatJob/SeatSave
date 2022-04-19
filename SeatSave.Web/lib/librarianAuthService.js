import { authService } from './authService';

const userType = 'librarian';
export const librarianAuthService = {
  login: (email, password) => authService.getUser(email, password, userType),
  logout: () => authService.logout(userType),
  getUser: () => authService.getUser(userType),
};
