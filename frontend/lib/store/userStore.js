import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  id: '',
  setUser: (username, id) => set({ username, id }),
}));

export default useUserStore;
