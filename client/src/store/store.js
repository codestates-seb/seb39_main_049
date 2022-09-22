import axios from 'axios';
import create from 'zustand';
import bronze from '../assets/images/bronze.png';
import { client } from '../utils/axiosInstance';

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
  questions: {},
  getQuestions: async (page) => {
    const res = await client.get(`/questions?page=${page}&size=9`);
    set({ questions: res.data });
  },
}));

export const answerStore = create((set, get) => ({
  question: {},
  getQuestion: async (questionId) => {
    try {
      const res = await client.get(`/questions/${questionId}?page=1&size=10`);
      set((state) => ({
        question: { ...res.data, views: res.data.views + 1 },
      }));
      const updateViews = await client.put(`/questions/${questionId}/views`, {
        views: get().question.views,
      });
    } catch (err) {
      console.log(err);
    }
  },
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
