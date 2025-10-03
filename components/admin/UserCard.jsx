import { getFormattedDateTime } from "@/lib/getFormattedDate";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export const UserCard = ({
  user: {
    full_name,
    email,
    id,
    subscription_plan: plan,
    subscription_end,
    avatar_url,
    updated_at,
  },
}) => {
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-primary mb-4">User Details</h2>
      <div className="mt-4 flex items-center space-x-4">
        {avatar_url ? (
          <Image
            src={avatar_url}
            width={64}
            height={64}
            alt={`${full_name}'s avatar`}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <span className="text-2xl font-bold">
              {full_name ? full_name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}
        <div className="flex-1 text-sm text-gray-700">
          <p className="font-medium text-primary text-lg">{full_name}</p>
          <p className="italic mb-4">{email}</p>
          <DataRow label={"Plan"} value={plan.toUpperCase()} />
          <DataRow
            label={"Expires"}
            value={getFormattedDateTime(subscription_end)}
          />
          <DataRow
            label={"Last updated"}
            value={getFormattedDateTime(updated_at)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button asChild className="" variant="outline">
          <Link
            //   href={`/admin/users/${user.id}/contact`}
            href={`mailto:${email}`}
          >
            Contact User
          </Link>
        </Button>
        <Button asChild className="">
          <Link href={`/admin/users/${id}`}>View Activities</Link>
        </Button>
      </div>
    </div>
  );
};

export const DataRow = ({ label, value }) => (
  <div className="grid grid-cols-[120px_1fr] gap-4 mb-2">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);
