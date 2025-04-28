// components/loading-spinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-900 border-opacity-75"></div>
    </div>
  );
}
