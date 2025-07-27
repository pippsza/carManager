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

const inputStyles =
  "w-full h-12 border-none bg-inputs px-5 py-3 rounded-[12px]";

const CatalogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

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
            <h1 className="text-2xl font-bold text-main mb-4">
              Ошибка загрузки
            </h1>
            <p className="text-gray mb-6">{error}</p>
            <Button
              onClick={() => navigate("/catalog")}
              name="Вернуться к каталогу"
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
              name="Вернуться к каталогу"
              className="w-auto px-6"
            />
          </div>
        </Container>
      </div>
    );
  }

  const formatMileage = (mileage) => {
    return mileage.toLocaleString().replace(/,/g, " ");
  };

  return (
    <Container className="grid grid-cols-[640px_488px] gap-18 py-21">
      <div className="flex flex-col gap-10">
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-128 object-cover object-center rounded-[19px]"
        />
        <div className="w-full h-122 border-[1px] p-8 rounded-[10px] border-gray-light flex flex-col gap-6 justify-center items-center">
          <div className="w-full">
            <h3 className="text-main font-semibold text-[20px] leading-[120%] mb-2 ">
              Book your car now
            </h3>
            <p className="text-gray text-[16px] leading-[125%] ">
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input type="text" placeholder="Name*" className={inputStyles} />
            <input type="text" placeholder="Email*" className={inputStyles} />
            <input
              type="text"
              placeholder="Booking Date"
              className={inputStyles}
            />

            <textarea
              placeholder="Comment"
              className={`${inputStyles} resize-none h-22 pt-3 pr-5 pb-14 pl-5 overflow-hidden`}
            ></textarea>
          </div>
          <Button name="Send" className="w-39 h-11" />
        </div>
      </div>
    </Container>
  );
};

export default CatalogDetailPage;
