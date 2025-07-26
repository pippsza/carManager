import { useSelector } from "react-redux";
import { selectCars } from "../redux/cars/selectors.js";
import Container from "../components/Container.jsx";
import CarList from "../components/CarsList.jsx";
import Filters from "../components/Filters.jsx";

const CatalogPage = () => {
  const cars = useSelector(selectCars);

  console.log("cars", cars);
  return (
    <div className="">
      <Container>
        <Filters />
        {cars?.cars?.length > 0 && <CarList cars={cars.cars} />}
      </Container>
    </div>
  );
};

export default CatalogPage;
