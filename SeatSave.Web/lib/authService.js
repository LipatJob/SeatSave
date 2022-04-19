async function login(email, password, userType) {
  const response = await fetch(`${process.env.API_URL}/Api/Authentication`, {
    method: 'POST',
    body: {
      username: email,
      password: password,
    },
  });
  const user = await response.json();
  localStorage.setItem('user' + userType, JSON.stringify(user));

  return user;
}

function logout(userType) {
  localStorage.removeItem('user' + userType);
}

function getUser(userType) {
  return localStorage.getItem('user' + userType);
}

export const authService = {
  getUser,
  login,
  logout,
};
