import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../redux/cars/operations";
import {
  selectCurrentCar,
  selectIsLoading,
  selectError,
} from "../redux/cars/selectors";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Icon from "../components/Icon";
import BookingForm from "../components/BookingForm";
import CarHeader from "../components/CarHeader";
import DetailSection from "../components/DetailSection";
import useBookingForm from "../hooks/useBookingForm";
import { formatMileage, getCityFromAddress } from "../utils/formatters";
import { catalogDetailStyles } from "../styles/catalogDetailStyles";

const CatalogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  } = useBookingForm(car);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={catalogDetailStyles.errorContainer}>
        <Container>
          <Loader />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className={catalogDetailStyles.errorContainer}>
        <Container>
          <div className={catalogDetailStyles.errorContent}>
            <h1 className={catalogDetailStyles.errorTitle}>Loading error</h1>
            <p className={catalogDetailStyles.errorText}>{error}</p>
            <Button
              onClick={() => navigate("/catalog")}
              name="Back to Catalog"
              className={catalogDetailStyles.backButton}
            />
          </div>
        </Container>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={catalogDetailStyles.errorContainer}>
        <Container>
          <div className={catalogDetailStyles.errorContent}>
            <h1 className={catalogDetailStyles.errorTitle}>Car not found</h1>
            <Button
              onClick={() => navigate("/catalog")}
              name="Back to Catalog"
              className={catalogDetailStyles.backButton}
            />
          </div>
        </Container>
      </div>
    );
  }

  const carSpecifications = [
    `Year: ${car.year}`,
    `Type: ${car.type}`,
    `Fuel Consumption: ${car.fuelConsumption}`,
    `Engine Size: ${car.engineSize}`,
  ];

  const specificationIcons = ["calendar", "car", "fuel-pump", "gear"];

  return (
    <Container className={catalogDetailStyles.mainContainer}>
      <div className={catalogDetailStyles.leftColumn}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={catalogDetailStyles.carImage}
        />
        <BookingForm
          formData={formData}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
      <div>
        <CarHeader
          car={car}
          getCityFromAddress={getCityFromAddress}
          formatMileage={formatMileage}
        />
        <div className={catalogDetailStyles.rightColumn}>
          <DetailSection
            title="Rental Conditions:"
            items={car.rentalConditions}
          />
          <div>
            <h4 className={catalogDetailStyles.sectionTitle}>
              Car Specifications:
            </h4>
            <ul className={catalogDetailStyles.listContainer}>
              {carSpecifications.map((spec, index) => (
                <li key={index} className={catalogDetailStyles.listItem}>
                  <Icon
                    name={specificationIcons[index]}
                    className={catalogDetailStyles.icon}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
          <DetailSection
            title="Accessories and functionalities:"
            items={car.functionalities}
          />
        </div>
      </div>
    </Container>
  );
};

export default CatalogDetailPage;
