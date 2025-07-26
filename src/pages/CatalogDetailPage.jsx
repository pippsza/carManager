import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/cars/operations";
import {
  selectCars,
  selectIsLoading,
  selectError,
} from "../redux/cars/selectors";

const CatalogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const car = cars.find((car) => car.id === parseInt(id));

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, cars.length]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Ошибка!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Автомобиль не найден
          </h1>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Вернуться к каталогу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/catalog")}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Назад к каталогу
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={car.img || "/placeholder-car.jpg"}
              alt={car.make + " " + car.model}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {car.make} {car.model}
            </h1>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Год выпуска:
                </span>
                <span className="text-gray-600">{car.year}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">Тип:</span>
                <span className="text-gray-600">{car.type}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Расход топлива:
                </span>
                <span className="text-gray-600">
                  {car.fuelConsumption} л/100км
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">
                  Объем двигателя:
                </span>
                <span className="text-gray-600">{car.engineSize}L</span>
              </div>

              {car.accessories && car.accessories.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700">
                    Дополнительные опции:
                  </span>
                  <ul className="mt-2 space-y-1">
                    {car.accessories.map((accessory, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {accessory}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${car.rentalPrice}/день
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Забронировать
              </button>
            </div>
          </div>
        </div>

        {car.description && (
          <div className="p-8 border-t">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Описание
            </h3>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogDetailPage;
