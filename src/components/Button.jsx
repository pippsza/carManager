import { Link } from "react-router-dom";

export default function Button({
  name,
  link,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "bg-button text-white rounded-[12px] font-semibold text-base hover:bg-button-hover transition-colors flex items-center justify-center hover:cursor-pointer";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-button"
    : "";
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

  if (link) {
    return (
      <a href={link} className={combinedClasses}>
        {name}
      </a>
    );
  }

  if (onClick || type === "submit") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {name}
      </button>
    );
  }

  return <Link className={combinedClasses}>{name}</Link>;
}
