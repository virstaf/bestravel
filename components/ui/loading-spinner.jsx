// components/loading-spinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh - 80px)]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 border-opacity-75"></div>
    </div>
  );
}
