// components/loading-spinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 border-opacity-75"></div>
    </div>
  );
}
