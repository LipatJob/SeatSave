import jwt_decode from 'jwt-decode';

async function login(email, password, userGroup) {
  const response = await fetch(`${process.env.API_URL}/api/Authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      userGroup,
    }),
  });

  if (response.status === 404) {
    return null;
  }
  if (response.status === 200) {
    const token = await response.text();
    localStorage.setItem(`user${userGroup}`, token);
    return token;
  }

  return null;
}

function logout(userGroup) {
  localStorage.removeItem(`user${userGroup}`);
}

function getToken(userGroup) {
  return localStorage.getItem(`user${userGroup}`);
}

function isLoggedIn(userGroup) {
  return getToken(userGroup) != null;
}

function getUser(userGroup) {
  const token = getToken(userGroup);
  return jwt_decode(token);
}

export default {
  getToken,
  getUser,
  login,
  logout,
  isLoggedIn,
};
