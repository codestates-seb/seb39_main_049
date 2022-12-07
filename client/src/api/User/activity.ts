import axiosInstance from '../../utils/axiosInstance';

export interface Answer {
  questionId: number;
  questionContent: string;
  subCategory: string;
  content: string;
  createdAt: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface UsersActivity {
  myPosts: { data: Answer[]; pageInfo: PageInfo };
}

export async function getUsersActivity(
  activity: string,
  id: number,
  page: number,
  size: number
) {
  const result = await axiosInstance.get(
    `/users/${id}/user-${activity}?page=${page}&size=${size}`
  );
  return result;
}
