import axiosInstance from '../utils/useAxiosPrivate';

export async function putAnswer(data) {
  try {
    const res = axiosInstance.put(`/answers/${data.answerId}`, {
      content: data.content,
    });
    alert('답변이 수정되었습니다.');
  } catch (err) {
    console.log(err);
    // alert('수정에 실패했습니다.');
  }
}