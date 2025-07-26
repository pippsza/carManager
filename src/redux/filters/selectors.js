import { createSelector } from "@reduxjs/toolkit";
import { selectCars } from "../cars/selectors";

export const selectBrandFilter = (state) => state.filters.brand;
export const selectPriceFromFilter = (state) => state.filters.priceFrom;
export const selectPriceToFilter = (state) => state.filters.priceTo;
export const selectMileageFromFilter = (state) => state.filters.mileageFrom;
export const selectMileageToFilter = (state) => state.filters.mileageTo;

export const selectFilteredCars = createSelector(
  [
    selectCars,
    selectBrandFilter,
    selectPriceFromFilter,
    selectPriceToFilter,
    selectMileageFromFilter,
    selectMileageToFilter,
  ],
  (cars, brand, priceFrom, priceTo, mileageFrom, mileageTo) => {
    return cars.filter((car) => {
      const matchesBrand = !brand || car.make === brand;

      const matchesPrice =
        (!priceFrom || car.rentalPrice >= parseFloat(priceFrom)) &&
        (!priceTo || car.rentalPrice <= parseFloat(priceTo));

      const matchesMileage =
        (!mileageFrom || car.mileage >= parseFloat(mileageFrom)) &&
        (!mileageTo || car.mileage <= parseFloat(mileageTo));

      return matchesBrand && matchesPrice && matchesMileage;
    });
  }
);
