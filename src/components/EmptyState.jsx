import Icon from "./Icon";

export default function EmptyState({ message = "No cars found" }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-light flex items-center justify-center">
          <Icon name="car" className="w-8 h-8 text-gray" />
        </div>
        <p className="text-main text-lg font-medium mb-2">{message}</p>
        <p className="text-gray text-sm">Try adjusting your search filters</p>
      </div>
    </div>
  );
}
