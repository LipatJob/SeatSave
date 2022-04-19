function getUser() {
  return localStorage.getItem('user');
}

async function login(email, password) {
  const response = await fetch(`${process.env.API_URL}/Api/Authentication`, {
    method: 'POST',
    body: {
      username: email,
      password: password,
    },
  });
  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));

  return user;
}

function logout() {
  localStorage.removeItem('user');
}

export const authService = {
  getUser,
  login,
  logout,
};
