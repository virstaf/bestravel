import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const UserActions = ({ row }) => {
  const handleViewProfile = () => {
    console.log("View profile for:", row.id);
    redirect(`/admin/users/${row.id}`);
  };

  const handleViewTrips = () => {
    console.log("View trips for:", row.id);
    // redirect(`/admin/users/${row.id}/trips`);
  };

  const handleSendMessage = () => {
    console.log("Send email to:", row);
    redirect(`mailto:${row.email}`);
  };

  const handleDeactivate = () => {
    console.log("Deactivate user:", row.id);

    // setData(data.filter((item) => item.id !== row.id));
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg z-20">
        <button
          onClick={handleViewProfile}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Profile
        </button>
        <button
          onClick={handleViewTrips}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          View Trips
        </button>
        <button
          onClick={handleSendMessage}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Mail className="h-4 w-4 mr-2" />
          Send Message
        </button>
        <button
          onClick={handleDeactivate}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Deactivate User
        </button>
      </div>
    </>
  );
};

export default UserActions;
