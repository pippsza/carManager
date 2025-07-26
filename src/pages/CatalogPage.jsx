import { useSelector } from "react-redux";
import { selectCars } from "../redux/cars/selectors.js";
import Container from "../components/Container.jsx";
import CarList from "../components/CarsList.jsx";
import Filters from "../components/Filters.jsx";
import Pagination from "../components/Pagination";

const CatalogPage = () => {
  const cars = useSelector(selectCars);

  console.log("cars from API", cars);

  return (
    <div className="py-21">
      <Container>
        <Filters />
        {cars?.length > 0 && <CarList cars={cars} />}
        <Pagination />
      </Container>
    </div>
  );
};

export default CatalogPage;
