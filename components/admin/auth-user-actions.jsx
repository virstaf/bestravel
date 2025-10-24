import { Mail } from "lucide-react";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { UserRoundCheckIcon } from "@/components/ui/UserRoundCheckIcon";
import { deleteAuthUser, signInWithEmailOtp } from "@/actions/admin/users";
import { toast } from "sonner";
import Modal from "../Modal";

const AuthUserActions = ({ row }) => {
  const handleResendVerification = async (row) => {
    console.log("Resend verification email to:", row);
    const { error, data } = await signInWithEmailOtp(row.email);
    // redirect(`/admin/users/${row.id}`);
    if (error) {
      console.error(error);
      toast.error("Error sending verifcation email");
      return null;
    }
    toast.success("OTP Sent Successfully!", {
      description: "Check your email for instructions to login",
    });
  };

  const handleSendEmail = (row) => {
    console.log("Send email to:", row);
    redirect(`mailto:${row.email}`);
  };

  const handleUserDelete = async (row) => {
    console.log("Delete user:", row);
    const { error } = await deleteAuthUser(row.id);

    if (error) {
      toast.error("Error deleting user!");
      console.error(error);
      return null;
    }

    toast.success("User deleted successfully!");
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg z-20">
        <button
          onClick={() => handleResendVerification(row)}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <UserRoundCheckIcon className="h-4 w-4 mr-2" />
          Resend Verification
        </button>
        <button
          onClick={() => handleSendEmail(row)}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </button>
        {/* <button
          onClick={() => handleUserDelete(row)}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </button> */}
        <Modal
          trigger={
            <div className="flex items-center min-w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </div>
          }
          yes="Continue"
          no="Cancel"
          action={() => handleUserDelete(row)}
        />
      </div>
    </>
  );
};

export default AuthUserActions;
