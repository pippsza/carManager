const Icon = ({ name, className = "w-4 h-4" }) => (
  <svg className={className}>
    <use href={`/symbol-defs.svg#icon-${name}`} />
  </svg>
);

export default Icon;
