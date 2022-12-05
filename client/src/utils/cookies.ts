import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const cookieOption = {
  // sameSite: 'none',
  secure: true,
  path: '/',
};

export const setAccessToken = (accessToken: string) => {
  cookies.set('access_token', accessToken, cookieOption);
};
export const getAccessToken = () => {
  return cookies.get('access_token');
};
export const removeAccessToken = () => {
  return cookies.remove('access_token', cookieOption);
};

export const setRefreshToken = (refreshToken: string) => {
  cookies.set('refresh_token', refreshToken, cookieOption);
};
export const getRefreshToken = () => {
  return cookies.get('refresh_token');
};
export const removeRefreshToken = () => {
  return cookies.remove('refresh_token', cookieOption);
};

export const setUserId = (userId: number) => {
  cookies.set('user_id', userId, cookieOption);
};
export const getUserId = () => {
  return cookies.get('user_id');
};
export const removeUserId = () => {
  return cookies.remove('user_id', cookieOption);
};
