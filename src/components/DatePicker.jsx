import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

const DatePicker = ({ value, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const datePickerRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date) => {
    if (!date) return placeholder || "Select date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -(firstDayOfWeek - 1 - i));
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: new Date(year, month, day),
      });
    }

    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate.getDate(),
        isCurrentMonth: false,
        fullDate: nextDate,
      });
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.fullDate);
      onChange(formatDate(day.fullDate));
      setIsOpen(false);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="relative" ref={datePickerRef}>
      <div
        className={`${className} cursor-pointer flex items-center justify-between relative`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? "text-main" : "text-gray"}>
          {formatDisplayDate(selectedDate)}
        </span>
        <Icon name="calendar" className="w-5 h-5 text-gray" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-light rounded-[12px] shadow-lg z-50 p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon name="arrowDown" className="w-4 h-4 text-gray rotate-90" />
            </button>
            <h3 className="text-main font-semibold text-lg">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon name="arrowDown" className="w-4 h-4 text-gray -rotate-90" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(day)}
                className={`
                  w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
                  ${
                    day.isCurrentMonth
                      ? "text-main hover:bg-gray-100"
                      : "text-gray-light"
                  }
                  ${
                    isSelected(day.fullDate)
                      ? "bg-button text-white hover:bg-button-hover"
                      : ""
                  }
                  ${
                    isToday(day.fullDate) && !isSelected(day.fullDate)
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }
                `}
              >
                {day.date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
