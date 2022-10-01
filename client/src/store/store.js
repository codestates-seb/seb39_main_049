import create from 'zustand';
import { getRefreshToken, getUserId } from '../utils/cookies';
import axiosInstance from '../utils/useAxiosPrivate';
export const countStore = create((set) => ({
  count: 0,
  increase() {
    set((state) => ({ count: state.count + 1 }));
  },
  decrease() {
    set((state) => ({ count: state.count - 1 }));
  },
}));

export const questionStore = create((set) => ({
  questions: {
    data: [],
  },
  getQuestions: async (page, mainCategory, subCategory, sort) => {
    const res = await axiosInstance.get(
      `/questions/tags?page=${page}&size=9&mainCategory=${mainCategory}&subCategory=${subCategory}&sort=${sort}`
    );
    set((state) => ({
      questions: {
        data: [...res.data.data],
      },
    }));
  },
}));

export const answerStore = create((set, get) => ({
  question: {},
  getQuestion: async (questionId) => {
    try {
      const res = await axiosInstance.get(
        `/questions/${questionId}?page=1&size=10&sort=createdAt`
      );
      set((state) => ({
        question: { ...res.data, views: res.data.views + 1 },
      }));
      const updateViews = await axiosInstance.put(
        `/questions/${questionId}/views`,
        {
          views: get().question.views,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  //updateVotes적용 시 문제 발생함
  // updateVotes: async (answerId) => {
  //   set((state) => ({
  //     question: {
  //       ...state.question,
  //       answers: {
  //         ...state.question.answers,
  //         data: [
  //           ...state.question.answers.data.map((answer) => {
  //             console.log(answer);
  //           }),
  //         ],
  //       },
  //     },
  //   }));
  // },
}));

export const questionRegisterStore = create((set) => ({
  questions: { mainCategory: '', subCategory: '', content: '' },
  handleContentChange(e) {
    set((state) => ({
      questions: { ...state.questions, content: e.target.value },
    }));
  },
  handleMainChange(e) {
    set((state) => ({
      questions: {
        ...state.questions,
        mainCategory: e.target.value,
        subCategory: '',
      },
    }));
  },
  handleSubChange(e) {
    set((state) => ({
      questions: { ...state.questions, subCategory: e.target.value },
    }));
  },
}));

export const loginStore = create((set) => ({
  isLogin: false,
  userId: 0,
  loginHandler() {
    const refresh_token = getRefreshToken();
    if (refresh_token) {
      set((state) => ({ isLogin: true }));
    } else {
      set((state) => ({ isLogin: false }));
    }
  },
  setUserId(id) {
    set((state) => ({
      ...state,
      userId: getUserId(),
    }));
  },
}));
export const userStore = create((set) => ({
  email: '',
  profile: '',
  nickname: '',
  getUser: async (userId) => {
    const res = await axiosInstance.get(`/users/${userId}`);
    set((state) => ({
      email: res.data.email,
      profile: res.data.profile,
      nickname: res.data.nickname,
    }));
  },
}));
