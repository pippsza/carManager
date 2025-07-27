import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCarById } from "../redux/cars/operations";
import {
  selectCurrentCar,
  selectIsLoading,
  selectError,
} from "../redux/cars/selectors";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import Icon from "../components/Icon";

const inputStyles =
  "w-full h-12 border-none bg-inputs px-5 py-3 rounded-[12px]";

const CatalogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  console.log("CatalogDetailPage car:", car);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      bookingDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("sending");
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields (Name and Email)");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    toast.loading("Sending your booking request...", { id: "booking-request" });

    const bookingData = {
      carId: car.id,
      carBrand: car.brand,
      carModel: car.model,
      customerName: formData.name,
      customerEmail: formData.email,
      bookingDate: formData.bookingDate,
      comment: formData.comment,
      timestamp: new Date().toISOString(),
    };

    console.log("Booking form submitted:", bookingData);

    setTimeout(() => {
      setIsSubmitting(false);

      toast.success(
        `Thank you, ${formData.name}! Your booking request for ${car.brand} ${car.model} has been submitted.`,
        { id: "booking-request" }
      );

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
    }, 1500);
  };

  const formatMileage = (mileage) => {
    return mileage.toLocaleString().replace(/,/g, " ");
  };

  const getCityFromAddress = (address) => {
    if (!address) return "";
    const parts = address.split(", ");
    // Для формата "123 Example Avenue, Odessa, Ukraine" берем последние 2 части
    if (parts.length >= 2) {
      return parts.slice(-2).join(", "); // "Odessa, Ukraine"
    }
    return address;
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="py-21">
        <Container>
          <Loader />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-21">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-main mb-4">Loading error</h1>
            <p className="text-gray mb-6">{error}</p>
            <Button
              onClick={() => navigate("/catalog")}
              name="Back to Catalog"
              className="w-auto px-6"
            />
          </div>
        </Container>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="py-21">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-main mb-4">Car not found</h1>
            <Button
              onClick={() => navigate("/catalog")}
              name="Back to Catalog"
              className="w-auto px-6"
            />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <Container className="grid grid-cols-[640px_488px] gap-18 py-21 h-255">
      <div className="flex flex-col gap-10">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-128 object-cover object-center rounded-[19px]"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full h-122 border-[1px] p-8 rounded-[10px] border-gray-light flex flex-col gap-6 justify-center items-center"
        >
          <div className="w-full">
            <h3 className="text-main font-semibold text-[20px] leading-[120%] mb-2 ">
              Book your car now
            </h3>
            <p className="text-gray text-[16px] leading-[125%] ">
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleInputChange}
              className={inputStyles}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              className={inputStyles}
              required
            />
            <DatePicker
              value={formData.bookingDate}
              onChange={handleDateChange}
              placeholder="Booking Date"
              className={inputStyles}
            />

            <textarea
              name="comment"
              placeholder="Comment"
              value={formData.comment}
              onChange={handleInputChange}
              className={`${inputStyles} resize-none h-22 pt-3 pr-5 pb-14 pl-5 overflow-hidden`}
            ></textarea>
          </div>
          <Button
            type="submit"
            name={isSubmitting ? "Sending..." : "Send"}
            className="w-39 h-11"
            disabled={isSubmitting}
          />
        </form>
      </div>
      <div>
        <div className="flex gap-4 items-center">
          <h2 className=" text-main text-2xl font-semibold leading-[1.33%] w-full mb-2 ">
            {car.brand} {car.model},{car.year}
          </h2>
          <p className="text-gray text-[16px] font-medium truncate">
            id: {car.id}
          </p>
        </div>
        <div className="flex items-center gap-1 text-main text-[16px] font-medium mb-4">
          <Icon name="Location" className="w-4 h-4" />
          <span className="mr-4">{getCityFromAddress(car.address)}</span>

          <span>Mileage: {formatMileage(car.mileage)} km</span>
        </div>
        <p className="text-button text-[24px] font-semibold mb-8">
          ${car.rentalPrice}
        </p>
        <p className="text-main text-[16px] leading-[125%] font-medium mb-17">
          {car.description}
        </p>
        <div className="flex flex-col justify-between h-193">
          <div>
            <h4 className="text-main text-[18px] font-semibold mb-5  ">
              Rental Conditions:
            </h4>
            <ul className="flex flex-col gap-4 bg-gray-50  rounded-b-lg">
              {car.rentalConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-main text-[16px] font-medium"
                >
                  <Icon name="check-circle" className="w-4 h-4" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-main text-[18px] font-semibold mb-5  ">
              Car Specifications:
            </h4>
            <ul className="flex flex-col gap-4 bg-gray-50  rounded-b-lg">
              <li className="flex items-center gap-2 text-main text-[16px] font-medium">
                <Icon name="calendar" className="w-4 h-4" />
                <span>Year: {car.year}</span>
              </li>
              <li className="flex items-center gap-2 text-main text-[16px] font-medium">
                <Icon name="car" className="w-4 h-4" />
                <span>Type: {car.type}</span>
              </li>
              <li className="flex items-center gap-2 text-main text-[16px] font-medium">
                <Icon name="fuel-pump" className="w-4 h-4" />
                <span>Fuel Consumption: {car.fuelConsumption}</span>
              </li>
              <li className="flex items-center gap-2 text-main text-[16px] font-medium">
                <Icon name="gear" className="w-4 h-4" />
                <span>Engine Size: {car.engineSize}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-main text-[18px] font-semibold mb-5  ">
              Accessories and functionalities:
            </h4>
            <ul className="flex flex-col gap-4 bg-gray-50  rounded-b-lg">
              {car.functionalities.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-main text-[16px] font-medium"
                >
                  <Icon name="check-circle" className="w-4 h-4" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CatalogDetailPage;
