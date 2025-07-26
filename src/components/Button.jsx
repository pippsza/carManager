import { Link } from "react-router-dom";

export default function Button({ name, link, className = "" }) {
  const baseClasses =
    "bg-button text-white rounded-[12px] font-semibold text-base hover:bg-button-hover transition-colors flex items-center justify-center";
  const combinedClasses = `${baseClasses} ${className}`;

  if (link) {
    return (
      <a href={link} className={combinedClasses}>
        {name}
      </a>
    );
  }

  return <Link className={combinedClasses}>{name}</Link>;
}
