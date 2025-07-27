import { Suspense, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import CatalogDetailPage from "./pages/CatalogDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { fetchCars } from "./redux/cars/operations.js";
import { selectCars } from "./redux/cars/selectors.js";

function App() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && cars.length === 0) {
      hasFetched.current = true;
      dispatch(fetchCars(1));
    }
  }, [dispatch, cars.length]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "top-right",
          style: {
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "16px 20px",
            backgroundColor: "var(--main)",
            color: "white",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontFamily: "var(--font-family)",
          },
          success: {
            style: {
              backgroundColor: "var(--button)",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "var(--button)",
            },
          },
          error: {
            style: {
              backgroundColor: "#ef4444",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "#ef4444",
            },
          },
        }}
      />
      <div>
        <Suspense fallback={<span className="bg-red-900"></span>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />

              <Route path="catalog">
                <Route index element={<CatalogPage />} />
                <Route path=":id" element={<CatalogDetailPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
