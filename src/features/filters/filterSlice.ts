import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type StatusFilter = "all" | "todo" | "in progress" | "done";

interface FilterState {
  status: StatusFilter;
  search: string; // optional text search
}

const initialState: FilterState = {
  status: "all",
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.status = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetFilters: (state) => {
      state.status = "all";
      state.search = "";
    },
  },
});

export const { setStatusFilter, setSearch, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
