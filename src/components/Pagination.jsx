import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPage, selectTotalPages, selectIsLoadingMore } from "../redux/cars/selectors";
import { selectAppliedFilters } from "../redux/filters/selectors";
import { fetchCars, fetchFilteredCars } from "../redux/cars/operations";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoadingMore = useSelector(selectIsLoadingMore);
  const appliedFilters = useSelector(selectAppliedFilters);

  const hasFilters = appliedFilters.brand || appliedFilters.priceFrom || appliedFilters.priceTo || appliedFilters.mileageFrom || appliedFilters.mileageTo;
  const hasMorePages = currentPage < totalPages;

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    
    if (hasFilters) {
      dispatch(fetchFilteredCars({ filters: appliedFilters, page: nextPage }));
    } else {
      dispatch(fetchCars(nextPage));
    }
  };

  // Don't show button if no more pages or currently loading
  if (!hasMorePages) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={handleLoadMore}
        disabled={isLoadingMore}
        className="bg-transparent border-button border-[1px] rounded-[12px] text-main w-39 h-11 hover:border-button-hover transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingMore ? "Loading..." : "Load more"}
      </button>
    </div>
  );
}
