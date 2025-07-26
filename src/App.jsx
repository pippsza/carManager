import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import CatalogDetailPage from "./pages/CatalogDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { fetchCars } from "./redux/cars/operations.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching cars...");
    dispatch(fetchCars()).then((response) => {
      console.log("Cars response:", response);
      console.log("Cars payload:", response.payload);
    });
  }, [dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-left",
          style: {
            fontSize: "12px",
            borderRadius: "8px",
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
