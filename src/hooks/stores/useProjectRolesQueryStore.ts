import { create } from "zustand";

export interface ProjectRoleQuery {
  searchText?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

interface ProjectRoleQueryStore {
  projectRoleQuery: ProjectRoleQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const useProjectRoleQueryStore = create<ProjectRoleQueryStore>((set) => ({
  projectRoleQuery: {},

  setSearchText: (searchText) =>
    set((store) => ({
      projectRoleQuery: { ...store.projectRoleQuery, searchText },
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      projectRoleQuery: {
        ...store.projectRoleQuery,
        sortOrder,
        searchText: undefined,
      },
    })),

  setPage: (page = 0) =>
    set((store) => ({
      projectRoleQuery: {
        ...store.projectRoleQuery,
        page,
        searchText: undefined,
      },
    })),

  setPageSize: (pageSize) =>
    set((store) => ({
      projectRoleQuery: {
        ...store.projectRoleQuery,
        pageSize,
        searchText: undefined,
      },
    })),
}));

export default useProjectRoleQueryStore;
