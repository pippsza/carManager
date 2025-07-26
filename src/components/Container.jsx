export default function Container({ children, className = "" }) {
  return <div className={` mx-auto px-30 w-360 ${className} `}>{children}</div>;
}
