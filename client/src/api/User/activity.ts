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
  pageInfo: PageInfo;
  myPosts: Answer[];
}

export async function getUsersActivity(
  activity: string,
  id: number,
  page: number,
  size: number
): Promise<object> {
  const result = await axiosInstance.get(
    `/users/${id}/user-${activity}?page=${page}&size=${size}`
  );
  return result;
}
