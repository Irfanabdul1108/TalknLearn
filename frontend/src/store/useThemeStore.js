import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("TalknLearn-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("TalknLearn-theme", theme);
    set({ theme });
  },
}));
