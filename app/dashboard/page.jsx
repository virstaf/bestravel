import DashHeader from "@/components/dash-header";

const page = () => {
  return (
    <div className="mx-auto px-4 w-full h-full">
      <DashHeader
        page="Overview"
        description="🌴 Ready for your next adventure?"
      />
      <div className="content min-w-full min-h-[calc(100vh-100px)] border"></div>
    </div>
  );
};

export default page;
