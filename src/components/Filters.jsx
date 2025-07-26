import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { selectBrands } from "../redux/cars/selectors.js";
import {
  selectBrandFilter,
  selectPriceToFilter,
  selectMileageFromFilter,
  selectMileageToFilter,
} from "../redux/filters/selectors.js";
import {
  setBrandFilter,
  setPriceFilter,
  setMileageFilter,
} from "../redux/filters/slice.js";
import { fetchFilteredCars } from "../redux/cars/operations.js";

const formatNumberWithCommas = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const removeCommas = (str) => {
  return str.replace(/,/g, "");
};

const Icon = ({ name, className = "w-4 h-4" }) => (
  <svg className={className}>
    <use href={`/src/assets/symbol-defs.svg#icon-${name}`} />
  </svg>
);

const PriceValueContainer = ({ children, ...props }) => {
  const domProps = Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        ![
          "clearValue",
          "getStyles",
          "getClassNames",
          "getValue",
          "hasValue",
          "isMulti",
          "isRtl",
          "selectOption",
          "selectProps",
          "setValue",
          "isDisabled",
          "cx",
        ].includes(key)
    )
  );

  return (
    <div {...domProps} style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "var(--main)", marginRight: "4px" }}>To $</span>
      {children}
    </div>
  );
};

export default function Filters() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const selectedBrand = useSelector(selectBrandFilter);
  const priceTo = useSelector(selectPriceToFilter);
  const mileageFrom = useSelector(selectMileageFromFilter);
  const mileageTo = useSelector(selectMileageToFilter);

  console.log("Brands in Filters:", brands);

  const brandOptions = [
    { value: "", label: "Enter the text" },
    ...brands.map((brand) => ({ value: brand, label: brand })),
  ];

  const priceOptions = [
    { value: "", label: "" },
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
    { value: "60", label: "60" },
    { value: "70", label: "70" },
    { value: "80", label: "80" },
    { value: "90", label: "90" },
    { value: "100", label: "100" },
    { value: "110", label: "110" },
    { value: "120", label: "120" },
    { value: "130", label: "130" },
    { value: "140", label: "140" },
    { value: "150", label: "150" },
    { value: "160", label: "160" },
    { value: "170", label: "170" },
    { value: "180", label: "180" },
    { value: "190", label: "190" },
    { value: "200", label: "200" },
  ];

  const handleBrandChange = (selectedOption) => {
    dispatch(setBrandFilter(selectedOption?.value || ""));
  };

  const handlePriceChange = (selectedOption) => {
    dispatch(setPriceFilter({ from: "", to: selectedOption?.value || "" }));
  };

  const handleMileageFromChange = (event) => {
    const rawValue = removeCommas(event.target.value);
    if (
      rawValue === "" ||
      (/^\d+$/.test(rawValue) && parseInt(rawValue) <= 1000000)
    ) {
      dispatch(setMileageFilter({ from: rawValue, to: mileageTo }));
    }
  };

  const handleMileageToChange = (event) => {
    const rawValue = removeCommas(event.target.value);
    if (
      rawValue === "" ||
      (/^\d+$/.test(rawValue) && parseInt(rawValue) <= 1000000)
    ) {
      dispatch(setMileageFilter({ from: mileageFrom, to: rawValue }));
    }
  };

  const handleSearch = () => {
    console.log("Search with filters:", {
      selectedBrand,
      priceTo,
      mileageFrom,
      mileageTo,
    });

    const filters = {};

    if (selectedBrand) {
      filters.brand = selectedBrand;
    }
    if (priceTo) {
      filters.rentalPrice = priceTo;
    }
    if (mileageFrom) {
      filters.minMileage = mileageFrom;
    }
    if (mileageTo) {
      filters.maxMileage = mileageTo;
    }

    console.log("Sending filters to API:", filters);

    dispatch(fetchFilteredCars(filters));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,

      backgroundColor: "var(--inputs)",
      padding: "0 10px",
      minHeight: "44px",
      borderRadius: "12px",
      fontSize: "14px",
      fontFamily: "var(--font-family)",
      border: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--gray)",
      fontSize: "16px",
      fontWeight: "500",
      textColor: "var(--main)",
    }),
    option: (provided, state) => ({
      ...provided,
      //   backgroundColor: state.isSelected
      //     ? "var(--button)"
      //     : state.isFocused
      //     ? "var(--badges)"
      //     : "white",
      backgroundColor: "white",
      color: state.isSelected ? "var(--main)" : "var(--gray)",
      //   borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
      "&:hover": {
        backgroundColor: "var(--badges)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "14px",
      //   backgroundColor: "red",
      color: "var(--main)",
      fontWeight: "500",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--gray)",
      "&:hover": {
        color: "var(--gray)",
      },
    }),
  };

  return (
    <div className="mb-14 flex justify-center">
      <div className="flex gap-4 items-end">
        {/* Car brand */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--gray)" }}
          >
            Car brand
          </label>
          <Select
            options={brandOptions}
            value={brandOptions.find(
              (option) => option.value === selectedBrand
            )}
            onChange={handleBrandChange}
            styles={customStyles}
            className="w-51"
            placeholder="Enter the text"
            isSearchable
            components={{
              DropdownIndicator: () => (
                <Icon name="arrowDown" className="w-4 h-4 " />
              ),
              IndicatorSeparator: () => null,
            }}
          />
        </div>

        {/* Price/hour */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--gray)" }}
          >
            Price/ 1 hour
          </label>
          <Select
            className="w-49"
            options={priceOptions}
            value={priceOptions.find((option) => option.value === priceTo)}
            onChange={handlePriceChange}
            styles={customStyles}
            placeholder=""
            components={{
              ValueContainer: PriceValueContainer,
              DropdownIndicator: () => (
                <Icon name="arrowDown" className="w-4 h-4 " />
              ),
              IndicatorSeparator: () => null,
            }}
          />
        </div>

        {/* Car mileage */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--gray)" }}
          >
            Сar mileage / km
          </label>
          <div className="flex ">
            <div className="relative w-40">
              <span
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium"
                style={{ color: "var(--main)" }}
              >
                From
              </span>
              <input
                type="text"
                value={formatNumberWithCommas(mileageFrom)}
                onChange={handleMileageFromChange}
                placeholder="3,000"
                className="w-full pl-12 pr-3 py-3 rounded-l-[12px] text-sm font-medium border-none outline-none text-center"
                style={{
                  backgroundColor: "var(--inputs)",
                  color: "var(--main)",
                }}
              />
            </div>
            <div className="w-px h-11 z-99 bg-gray-light"></div>
            <div className="relative w-40">
              <span
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium"
                style={{ color: "var(--main)" }}
              >
                To
              </span>
              <input
                type="text"
                value={formatNumberWithCommas(mileageTo)}
                onChange={handleMileageToChange}
                placeholder="5,500"
                className="w-full pl-8 pr-3 py-3 rounded-r-[12px] text-sm font-medium border-none outline-none text-center"
                style={{
                  backgroundColor: "var(--inputs)",
                  color: "var(--main)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div>
          <button
            onClick={handleSearch}
            className="w-39 h-11 rounded-[12px] font-medium transition-colors flex items-center justify-center"
            style={{
              backgroundColor: "var(--button)",
              color: "white",
              fontWeight: "600",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--button-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--button)")
            }
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
