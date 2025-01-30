import { useEffect } from 'react';
import { create } from 'zustand';
import { timerStartMs } from '../_consts';

interface UseTimerStore {
  timer: number;
  setTimer: (ms: number) => void;
  timerId: NodeJS.Timeout | undefined;
  setTimerId: (id: NodeJS.Timeout) => void;
  handleStartTimer: () => void;
  handleStopTimer: () => void;
  isStarted: boolean;
  resetTimer: () => void;
}

const useTimer = create<UseTimerStore>((set, get) => ({
  timer: timerStartMs,
  setTimer: (ms: number) => set({ timer: ms }),
  timerId: undefined,
  setTimerId: (id: NodeJS.Timeout) => set({ timerId: id }),
  handleStartTimer: () => set({ isStarted: true }),
  handleStopTimer: () => set({ isStarted: false }),
  isStarted: false,
  resetTimer: () => {
    clearTimeout(get().timerId);
    set({ timerId: undefined, timer: timerStartMs, isStarted: false });
  },
}));

const useTimerOnInterval = () => {
  const timerToggle = useTimer();
  const {
    isStarted,
    setTimer,
    timer,
    setTimerId,
    timerId,
  } = timerToggle;
  useEffect(() => {
    if (isStarted) {
      const increment = () => {
        setTimer(timer - 1000);
      };
      const id = setInterval(increment, 1000);
      setTimerId(id);
      return () => {
        clearInterval(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted, timer]);
  return { isStarted: timerToggle.isStarted, timer: timerToggle.timer };
};

export {
  useTimer,
  useTimerOnInterval,
};
