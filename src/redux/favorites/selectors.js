import { createSelector } from "@reduxjs/toolkit";
import { selectCars } from "../cars/selectors";

export const selectFavoriteIds = (state) => state.favorites.items;

export const selectIsFavorite = (carId) => (state) =>
  state.favorites.items.includes(carId);

export const selectFavoriteCars = createSelector(
  [selectCars, selectFavoriteIds],
  (cars, favoriteIds) => {
    return cars.filter((car) => favoriteIds.includes(car.id));
  }
);

export const selectFavoritesCount = (state) => state.favorites.items.length;
