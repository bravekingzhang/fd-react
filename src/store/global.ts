import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
interface GlobalState {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: "GlobalStore",
      storage: localforage, // 使用localforage存储
      // partialize 过滤属性，存储哪些字段到localStorage
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);

export default useGlobalStore;
