import { Question } from '@/lib/data/types';
import { create } from 'zustand';

interface UseUserQuizDataStore {
  progress: number;
  setProgress: (progress: number) => void;
  finalTime: number;
  setFinalTime: (finalTime: number) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  answersRecord: string[][];
  setAnswersRecord: (newAnswersRecord: string[][]) => void;
  reset: () => void;
}

const useUserQuizData = create<UseUserQuizDataStore>((set) => ({
  finalTime: 0,
  setFinalTime: (finalTime: number) => {
    set({ finalTime });
  },
  questions: [],
  setQuestions: (questions: Question[]) => {
    set({ questions });
  },
  answersRecord: [],
  setAnswersRecord: (newAnswersRecord: string[][]) => {
    set({ answersRecord: newAnswersRecord });
  },
  reset: () => {
    set({ answersRecord: [], finalTime: 0, questions: [] });
  },
  setProgress: (progress: number) => {
    set({ progress });
  },
  progress: 0,
}));

export default useUserQuizData;
