import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    current: {
      brand: "",
      priceFrom: "",
      priceTo: "",
      mileageFrom: "",
      mileageTo: "",
    },
    applied: {
      brand: "",
      priceFrom: "",
      priceTo: "",
      mileageFrom: "",
      mileageTo: "",
    },
  },
  reducers: {
    setBrandFilter: (state, action) => {
      state.current.brand = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.current.priceFrom = action.payload.from || "";
      state.current.priceTo = action.payload.to || "";
    },
    setMileageFilter: (state, action) => {
      state.current.mileageFrom = action.payload.from || "";
      state.current.mileageTo = action.payload.to || "";
    },
    resetFilters: (state) => {
      state.current = {
        brand: "",
        priceFrom: "",
        priceTo: "",
        mileageFrom: "",
        mileageTo: "",
      };
      state.applied = {
        brand: "",
        priceFrom: "",
        priceTo: "",
        mileageFrom: "",
        mileageTo: "",
      };
    },
    applyFilters: (state) => {
      state.applied = {
        brand: state.current.brand,
        priceFrom: state.current.priceFrom,
        priceTo: state.current.priceTo,
        mileageFrom: state.current.mileageFrom,
        mileageTo: state.current.mileageTo,
      };
    },
  },
});

export const {
  setBrandFilter,
  setPriceFilter,
  setMileageFilter,
  resetFilters,
  applyFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
