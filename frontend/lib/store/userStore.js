import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  id: '',
  name: '',
  surname: '',
  setUser: (username, id, name, surname) => set({ username, id, name, surname }),
}));

export default useUserStore;
