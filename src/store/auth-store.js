import { create } from "zustand";

const user = localStorage.getItem("user");
const useAuthStore = create((set) => ({
  visited: [],
  setVisited: (value) =>
    set((state) => ({
      visited: [...state.visited, value],
    })),
  user: user ? JSON.parse(user) : null,
  setUser: (value) =>
    set(() => ({
      user: value,
    })),
  clearUser: () =>
    set(() => ({
      user: null,
    })),
}));

export default useAuthStore;
