import LoadingSpinner from "@/components/ui/loading-spinner";

export default function DashboardLoading() {
  return (
    <div className=" w-screen h-screen grid items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
