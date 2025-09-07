export default function TabButton({ isActive, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
        isActive
          ? 'border-green-600 text-green-600 bg-green-50'
          : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}