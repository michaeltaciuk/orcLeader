import create from 'zustand';

const useStore = create((set) => ({
  userName: '',
  setUserName: (name) => set(() => ({ userName: name })),
}));

export default useStore;
