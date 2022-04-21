async function login(email, password, userGroup) {
  const response = await fetch(`${process.env.API_URL}/Api/Authentication`, {
    method: 'POST',
    body: {
      username: email,
      password,
      userGroup,
    },
  });
  const user = await response.json();
  localStorage.setItem(`user${userGroup}`, JSON.stringify(user));

  return user;
}

function logout(userGroup) {
  localStorage.removeItem(`user${userGroup}`);
}

function getUser(userGroup) {
  return localStorage.getItem(`user${userGroup}`);
}

export const authService = {
  getUser,
  login,
  logout,
};
