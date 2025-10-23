import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import {UserRoundCheckIcon} from "@/components/ui/UserRoundCheckIcon";

const AuthUserActions = ({ row }) => {
    const handleResendVerification = () => {
        console.log("View profile for:", row.id);
        redirect(`/admin/users/${row.id}`);
    };

    const handleSendEmail = () => {
        console.log("View trips for:", row.id);
        // redirect(`/admin/users/${row.id}/trips`);
    };


    const handleUserDelete = () => {
        console.log("Deactivate user:", row.id);

        // setData(data.filter((item) => item.id !== row.id));
    };

    return (
        <>
            <div className="bg-white border rounded-lg shadow-lg z-20">
                <button
                    onClick={handleResendVerification}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <UserRoundCheckIcon className="h-4 w-4 mr-2" />
                    Resend Verification
                </button>
                <button
                    onClick={handleSendEmail}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                </button>
                <button
                    onClick={handleUserDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                </button>
            </div>
        </>
    );
};

export default AuthUserActions;
