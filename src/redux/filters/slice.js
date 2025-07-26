import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    brand: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
  },
  reducers: {
    setBrandFilter: (state, action) => {
      state.brand = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFrom = action.payload.from || "";
      state.priceTo = action.payload.to || "";
    },
    setMileageFilter: (state, action) => {
      state.mileageFrom = action.payload.from || "";
      state.mileageTo = action.payload.to || "";
    },
    resetFilters: (state) => {
      state.brand = "";
      state.priceFrom = "";
      state.priceTo = "";
      state.mileageFrom = "";
      state.mileageTo = "";
    },
  },
});

export default filtersSlice.reducer;

export const {
  setBrandFilter,
  setPriceFilter,
  setMileageFilter,
  resetFilters,
} = filtersSlice.actions;
