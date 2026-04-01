import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, TransactionType } from "../../types";

const initialState: FilterState = {
  search: "",
  category: null,
  type: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setType(state, action: PayloadAction<TransactionType | null>) {
      state.type = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setCategory, setType, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
