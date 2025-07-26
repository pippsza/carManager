import CarCard from "./CarCard.jsx";

export default function CarList({ cars }) {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-10 mb-20">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
