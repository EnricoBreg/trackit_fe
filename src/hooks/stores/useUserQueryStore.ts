import { create } from "zustand";

export interface UserQuery {
  active?: 0 | 1;
  searchText?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

interface UserQueryStore {
  userQuery: UserQuery;
  setActive: (active: 0 | 1) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const useUserQueryStore = create<UserQueryStore>((set) => ({
  userQuery: {},

  setSearchText: (searchText) =>
    set((store) => ({ userQuery: { ...store.userQuery, searchText } })),

  setActive: (active) =>
    set((store) => ({
      userQuery: { ...store.userQuery, active, searchText: undefined },
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      userQuery: { ...store.userQuery, sortOrder },
    })),

  setPage: (page = 0) =>
    set((store) => ({
      userQuery: { ...store.userQuery, page, searchText: undefined },
    })),

  setPageSize: (pageSize) =>
    set((store) => ({
      userQuery: { ...store.userQuery, pageSize, searchText: undefined },
    })),
}));

export default useUserQueryStore;
