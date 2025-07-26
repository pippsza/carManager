import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function Navigaion() {
  const location = useLocation();

  return (
    <nav>
      <ul className={clsx("flex gap-8 text-[16px] font-medium text-center")}>
        <li>
          <Link
            to="/"
            className={clsx(
              "hover:text-button transition-colors",
              location.pathname === "/" ? "text-button-hover" : "text-main"
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/catalog"
            className={clsx(
              "hover:text-button transition-colors",
              location.pathname === "/catalog"
                ? "text-button-hover"
                : "text-main"
            )}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
