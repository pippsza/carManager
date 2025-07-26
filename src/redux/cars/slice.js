import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById, fetchFilteredCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    brands: [],
    currentCar: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
            .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        const carsData = action.payload.cars || action.payload;
        if (Array.isArray(carsData)) {
          state.items = carsData;
          const brands = [...new Set(carsData.map((car) => car.brand))];
          state.brands = brands;
        } else {
          console.warn("fetchCars payload does not contain cars array:", action.payload);
          state.items = [];
          state.brands = [];
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
            .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        
        const carsData = action.payload.cars || action.payload;
        if (Array.isArray(carsData)) {
          state.items = carsData;
        } else {
          console.warn("fetchFilteredCars payload does not contain cars array:", action.payload);
          state.items = [];
        }
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default carsSlice.reducer;
