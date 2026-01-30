import { create } from "zustand";

export interface TaskQuery {
  active?: 0 | 1;
  searchText?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

interface TaskQueryStore {
  taskQuery: TaskQuery;
  setActive: (active: 0 | 1) => void;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const useTaskQueryStore = create<TaskQueryStore>((set) => ({
  taskQuery: {},

  setSearchText: (searchText) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, searchText } })),

  setSortOrder: (sortOrder) =>
    set((store) => ({ taskQuery: { ...store.taskQuery, sortOrder } })),

  setActive: (active) =>
    set((store) => ({
      taskQuery: { ...store.taskQuery, active, searchText: undefined },
    })),

  setPage: (page = 0) =>
    set((store) => ({
      taskQuery: { ...store.taskQuery, page, searchText: undefined },
    })),

  setPageSize: (pageSize) =>
    set((store) => ({
      taskQuery: { ...store.taskQuery, pageSize, searchText: undefined },
    })),
}));

export default useTaskQueryStore;
