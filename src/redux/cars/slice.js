import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById, fetchFilteredCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    brands: [],
    currentCar: null,
    isLoading: false,
    isLoadingMore: false,
    error: null,
    pagination: {
      totalCars: 0,
      page: 1,
      totalPages: 1,
    },
  },
  reducers: {
    resetCars: (state) => {
      state.items = [];
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        const page = action.meta.arg || 1;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
            .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = null;
        
        const carsData = action.payload.cars || action.payload;
        const currentPage = parseInt(action.payload.page) || 1;
        
        if (Array.isArray(carsData)) {
          // If it's page 1 or we're starting fresh, replace items
          if (currentPage === 1) {
            state.items = carsData;
          } else {
            // For subsequent pages, append only if we don't already have these cars
            const existingIds = new Set(state.items.map(car => car.id));
            const newCars = carsData.filter(car => !existingIds.has(car.id));
            state.items = [...state.items, ...newCars];
          }
          
          // Update brands from all loaded cars
          const allBrands = [...new Set(state.items.map((car) => car.brand))];
          state.brands = allBrands;
        } else {
          console.warn("fetchCars payload does not contain cars array:", action.payload);
          if (currentPage === 1) {
            state.items = [];
            state.brands = [];
          }
        }
        
        // Update pagination data
        state.pagination = {
          totalCars: action.payload.totalCars || 0,
          page: currentPage,
          totalPages: action.payload.totalPages || 1,
        };
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
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
      .addCase(fetchFilteredCars.pending, (state, action) => {
        const page = action.meta.arg?.page || 1;
        if (page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
            .addCase(fetchFilteredCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = null;
        
        const carsData = action.payload.cars || action.payload;
        const currentPage = parseInt(action.payload.page) || 1;
        
        if (Array.isArray(carsData)) {
          // If it's page 1, replace items (new search); otherwise append
          if (currentPage === 1) {
            state.items = carsData;
          } else {
            // For subsequent pages, append only if we don't already have these cars
            const existingIds = new Set(state.items.map(car => car.id));
            const newCars = carsData.filter(car => !existingIds.has(car.id));
            state.items = [...state.items, ...newCars];
          }
        } else {
          console.warn("fetchFilteredCars payload does not contain cars array:", action.payload);
          if (currentPage === 1) {
            state.items = [];
          }
        }
        
        // Update pagination data
        state.pagination = {
          totalCars: action.payload.totalCars || 0,
          page: currentPage,
          totalPages: action.payload.totalPages || 1,
        };
      })
      .addCase(fetchFilteredCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
