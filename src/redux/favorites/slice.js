import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const carId = action.payload;
      if (!state.items.includes(carId)) {
        state.items.push(carId);
      }
    },
    removeFromFavorites: (state, action) => {
      const carId = action.payload;
      state.items = state.items.filter((id) => id !== carId);
    },
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.items.includes(carId)) {
        state.items = state.items.filter((id) => id !== carId);
      } else {
        state.items.push(carId);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
