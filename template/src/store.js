import { create } from "zustand";

const INITIAL_STATE = {
  style: null,
  user: null,
  ...globalThis.___PREFETCHED___,
};

// Initialize store regularly on client
const useStore = create((set) => ({
  ...INITIAL_STATE,
  updateUser: (payload) => {
    return set((state) => ({ ...state, user: payload }));
  },
  clearUser: () =>
    set((state) => ({
      ...state,
      user: null,
    })),
  updateStyle: (payload) =>
    set((state) => ({
      ...state,
      style: payload,
    })),
  clearStyle: () =>
    set((state) => ({
      ...state,
      style: null,
    })),
}));

export default useStore;
