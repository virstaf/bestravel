import { Mail } from "lucide-react";
import { UserCheck } from "lucide-react";
import { Eye } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Trash2 } from "lucide-react";

const ReservationActions = ({ row, setData }) => {
//   console.log("row:::", row);
  const handleViewDetails = () => {
    console.log("View details for:", row.ref_id);
  };

  const handleAssignToMe = () => {
    console.log("Assign to me:", row.ref_id);
  };

  const handleChangeStatus = () => {
    console.log("Change status for:", row.ref_id);
  };

  const handleContactUser = () => {
    console.log("Contact user:", row.ref_id);
  };

  const handleDelete = () => {
    console.log("Delete:", row.ref_id);
    // setData(data.filter((item) => item.id !== row.id));
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg z-20">
        <button
          onClick={handleViewDetails}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
        <button
          onClick={handleAssignToMe}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Assign to Me
        </button>
        <button
          onClick={handleChangeStatus}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Change Status
        </button>
        <button
          onClick={handleContactUser}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Mail className="h-4 w-4 mr-2" />
          Contact User
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </button>
      </div>
    </>
  );
};

export default ReservationActions;
