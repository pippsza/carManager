import React from "react";
import Icon from "./Icon";
import { catalogDetailStyles } from "../styles/catalogDetailStyles";

const CarHeader = ({ car, getCityFromAddress, formatMileage }) => {
  return (
    <>
      <div className={catalogDetailStyles.headerRow}>
        <h2 className={catalogDetailStyles.mainTitle}>
          {car.brand} {car.model}, {car.year}
        </h2>
        <p className={catalogDetailStyles.idText}>id: {car.id}</p>
      </div>
      <div className={catalogDetailStyles.locationRow}>
        <Icon name="Location" className={catalogDetailStyles.icon} />
        <span className="mr-4">{getCityFromAddress(car.address)}</span>
        <span>Mileage: {formatMileage(car.mileage)} km</span>
      </div>
      <p className={catalogDetailStyles.price}>${car.rentalPrice}</p>
      <p className={catalogDetailStyles.description}>{car.description}</p>
    </>
  );
};

export default CarHeader;
