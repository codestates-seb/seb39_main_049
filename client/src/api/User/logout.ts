import axiosInstance from '../../utils/axiosInstance';
import {
  removeAccessToken,
  removeRefreshToken,
  removeUserId,
  getRefreshToken,
} from '../../utils/cookies';

export async function postLogout() {
  try {
    const res = await axiosInstance.post(
      '/auths/logout',
      {},
      {
        headers: { Authorization: `${getRefreshToken()}` },
      }
    );
    removeAccessToken();
    removeRefreshToken();
    removeUserId();
    alert('로그아웃 되었습니다');
  } catch (err: any) {
    alert(err.response.data.message);
    console.error(err);
  }
}
