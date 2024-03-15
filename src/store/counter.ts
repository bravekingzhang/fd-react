import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
interface CounterState {
  counter: number;
  increase: (by: number) => void;
}

const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      counter: 0,
      increase: (by) => set((state) => ({ counter: state.counter + by })),
    }),
    {
      name: "CounterStore",
      getStorage: () => localforage,
      partialize: (state) => ({ counter: state.counter }),
    }
  )
);

export default useCounterStore;
