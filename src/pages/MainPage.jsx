import React from "react";
import bgImage from "../assets/bg.jpg";

import Button from "../components/Button.jsx";

const MainPage = () => {
  return (
    <section
      className="h-175 w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      ></div>

      <div className="relative z-10 w-full h-full ">
        <div className="absolute bottom-25 left-0 right-0 flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="font-bold text-[70px] text-white text-center leading-[120%]">
              Find your perfect rental car
            </h1>
            <p className="font-semibold text-white text-center leading-[133%] text-2xl">
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>
          <Button name="View Catalog" link="/catalog" className="w-69 h-11" />
        </div>
      </div>
    </section>
  );
};

export default MainPage;
