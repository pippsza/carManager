import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="py-21">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
