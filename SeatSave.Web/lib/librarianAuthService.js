import { authService } from './authService';
const userGroup = 'Librarian';
export const librarianAuthService = {
  login: (email, password) => authService.login(email, password, userGroup),
  logout: () => authService.logout(userGroup),
  getUser: () => authService.getUser(userGroup),
};
