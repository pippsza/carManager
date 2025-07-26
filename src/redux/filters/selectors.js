import { createSelector } from "@reduxjs/toolkit";
import { selectCars } from "../cars/selectors";

export const selectBrandFilter = (state) => state.filters.current.brand;
export const selectPriceFromFilter = (state) => state.filters.current.priceFrom;
export const selectPriceToFilter = (state) => state.filters.current.priceTo;
export const selectMileageFromFilter = (state) => state.filters.current.mileageFrom;
export const selectMileageToFilter = (state) => state.filters.current.mileageTo;

export const selectAppliedBrandFilter = (state) => state.filters.applied.brand;
export const selectAppliedPriceFromFilter = (state) => state.filters.applied.priceFrom;
export const selectAppliedPriceToFilter = (state) => state.filters.applied.priceTo;
export const selectAppliedMileageFromFilter = (state) => state.filters.applied.mileageFrom;
export const selectAppliedMileageToFilter = (state) => state.filters.applied.mileageTo;

export const selectAppliedFilters = createSelector(
  [
    selectAppliedBrandFilter,
    selectAppliedPriceFromFilter,
    selectAppliedPriceToFilter,
    selectAppliedMileageFromFilter,
    selectAppliedMileageToFilter,
  ],
  (brand, priceFrom, priceTo, mileageFrom, mileageTo) => ({
    brand,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
  })
);

export const selectFilteredCars = createSelector(
  [selectCars, selectAppliedFilters],
  (cars, appliedFilters) => {
    if (!Array.isArray(cars)) {
      console.warn("Cars is not an array:", cars);
      return [];
    }

    const hasFilters =
      appliedFilters.brand ||
      appliedFilters.priceFrom ||
      appliedFilters.priceTo ||
      appliedFilters.mileageFrom ||
      appliedFilters.mileageTo;

    if (!hasFilters) {
      return cars;
    }

    return cars.filter((car) => {
      const matchesBrand = !appliedFilters.brand || car.brand === appliedFilters.brand;

      const matchesPrice =
        (!appliedFilters.priceFrom || car.rentalPrice >= parseFloat(appliedFilters.priceFrom)) &&
        (!appliedFilters.priceTo || car.rentalPrice <= parseFloat(appliedFilters.priceTo));

      const matchesMileage =
        (!appliedFilters.mileageFrom || car.mileage >= parseFloat(appliedFilters.mileageFrom)) &&
        (!appliedFilters.mileageTo || car.mileage <= parseFloat(appliedFilters.mileageTo));

      return matchesBrand && matchesPrice && matchesMileage;
    });
  }
);
