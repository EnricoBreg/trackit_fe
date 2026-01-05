import { create } from "zustand";

interface UserQuery {
  active?: 0 | 1;
  searchText?: string;
  sortOrder?: string;
}

interface UserQueryStore {
  userQuery: UserQuery;
  setActive: (active: 0 | 1) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
}

const useUserQueryStore = create<UserQueryStore>((set) => ({
  userQuery: {},
  setSearchText: (searchText) => set(() => ({ userQuery: { searchText } })),
  setActive: (active) =>
    set((store) => ({
      userQuery: { ...store.userQuery, active, searchText: undefined },
    })),
  setSortOrder: (sortOrder) =>
    set((store) => ({
      userQuery: { ...store.userQuery, sortOrder, searchText: undefined },
    })),
}));

export default useUserQueryStore;
