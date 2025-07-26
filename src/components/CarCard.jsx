const CarInfo = ({ items }) => {
  return (
    <div className="flex items-center font-normal text-[12px] leading-[1.33333] text-gray">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span>{item}</span>
          {index < items.length - 1 && (
            <span className="mx-1.5 text-gray">|</span>
          )}
        </div>
      ))}
    </div>
  );
};

import Button from "./Button";

export default function CarCard({ car }) {
  const addressParts = car.address?.split(", ").slice(-2) || [];
  const firstLineItems = [...addressParts, car.rentalCompany];
  const secondLineItems = [
    car.type,
    car.model,
    `${car.mileage.toLocaleString()} km`,
  ];

  return (
    <div className="h-106 flex flex-col justify-between relative overflow-hidden rounded-lg">
      <div>
        <div className="relative mb-4 w-69 h-67">
          <img
            src={`${car.img}`}
            alt=""
            className="w-full h-full object-cover object-center rounded-[14px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-main text-[16px]">
            {car.brand} <span className="text-button">{car.model}</span>,{" "}
            {car.year}
          </p>
          <p className="leading-[125%] text-main text-[16px]">
            ${car.rentalPrice}
          </p>
        </div>
        <div className="mb-4 space-y-1">
          <CarInfo items={firstLineItems} />
          <CarInfo items={secondLineItems} />
        </div>
      </div>
      <Button link={car.id} name="Read More" className="w-full h-11" />
    </div>
  );
}
