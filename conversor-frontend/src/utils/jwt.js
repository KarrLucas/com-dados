import jwtDecode from 'jwt-decode';
//import { verify, sign } from 'jsonwebtoken';
//
import { api } from '../config';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const setSession = (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    localStorage.setItem('@centernorte-adm-accessToken', accessToken);
    localStorage.setItem('@centernorte-adm-refreshToken', refreshToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('@centernorte-adm-accessToken');
    localStorage.removeItem('@centernorte-adm-refreshToken');
    delete api.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
