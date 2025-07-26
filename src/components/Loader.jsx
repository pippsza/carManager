import Icon from "./Icon";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-button"></div>
        <p className="mt-4 text-gray text-sm">Loading cars...</p>
      </div>
    </div>
  );
}
