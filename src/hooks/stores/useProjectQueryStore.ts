import { create } from "zustand";

export interface ProjectQuery {
  searchText?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

interface ProjectQueryStore {
  projectQuery: ProjectQuery;

  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setPage: (pageNo: number) => void;
  setPageSize: (pageSize: number) => void;
}

const useProjectQueryStore = create<ProjectQueryStore>((set) => ({
  projectQuery: {},

  setSearchText: (searchText) =>
    set((store) => ({ projectQuery: { ...store.projectQuery, searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ projectQuery: { ...store.projectQuery, sortOrder } })),
  setPage: (pageNo) =>
    set((store) => ({
      projectQuery: {
        ...store.projectQuery,
        page: pageNo,
        searchText: undefined,
      },
    })),
  setPageSize: (pageSize) =>
    set((store) => ({
      projectQuery: {
        ...store.projectQuery,
        pageSize: pageSize,
        searchText: undefined,
      },
    })),
}));

export default useProjectQueryStore;
