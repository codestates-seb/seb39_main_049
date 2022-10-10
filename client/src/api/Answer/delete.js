import axiosInstance from '../../utils/axiosInstance';
export async function deleteAnswer(answerId) {
  try {
    const res = await axiosInstance.delete(`/answers/${answerId}`);
    alert('삭제되었습니다');
  } catch (err) {
    return err;
  }
}