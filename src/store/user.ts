import { create } from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
interface UserState {
  token: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  setSession: (session: string) => void;
  setUsername: (username: string) => void;
  setAvatar: (avatar: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  clear: () => void;
}

const useUserInfoStore = create<UserState>()(
  persist(
    (set) => ({
      token: "",
      username: "尊贵的匿名用户小站",
      avatar: "",
      email: "",
      phone: "",
      setSession: (session) => set({ token: session }),
      setUsername: (username) => set({ username }),
      setAvatar: (avatar) => set({ avatar }),
      setEmail: (email) => set({ email }),
      setPhone: (phone) => set({ phone }),
      clear: () =>
        set({ token: "", username: "", avatar: "", email: "", phone: "" }),
    }),
    {
      name: "GlobalStore",
      storage: localforage, // 使用localforage存储
      // partialize 过滤属性，存储哪些字段到localStorage
      partialize: (state) => ({
        session: state.token,
        username: state.username,
        avatar: state.avatar,
        email: state.email,
        phone: state.phone,
      }),
    }
  )
);

export default useUserInfoStore;
