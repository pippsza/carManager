import { useSelector } from "react-redux";
import { selectCars, selectIsLoading, selectIsLoadingMore, selectError } from "../redux/cars/selectors.js";
import Container from "../components/Container.jsx";
import CarList from "../components/CarsList.jsx";
import Filters from "../components/Filters.jsx";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

const CatalogPage = () => {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingMore = useSelector(selectIsLoadingMore);
  const error = useSelector(selectError);

  return (
    <div className="py-21">
      <Container>
        <Filters />
        
        {/* Показываем основной лоадер только при начальной загрузке */}
        {isLoading && !isLoadingMore && <Loader />}
        
        {error && (
          <EmptyState message="Something went wrong" />
        )}
        
        {/* Показываем контент если он загружен или если идет дозагрузка */}
        {!isLoading && !error && cars?.length > 0 && (
          <CarList cars={cars} />
        )}
        
        {!isLoading && !error && cars?.length === 0 && (
          <EmptyState message="No cars found" />
        )}
        
        {/* Показываем пагинацию если есть контент и нет основной загрузки */}
        {!isLoading && !error && cars?.length > 0 && <Pagination />}
      </Container>
    </div>
  );
};

export default CatalogPage;
