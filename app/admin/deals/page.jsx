import NavSummary from "@/components/NavSummary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDealsAction, deleteDealAction } from "@/actions/deals";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";

// Simple client wrapper for delete button to avoid client/server component issues in lists
const DeleteButton = ({ dealId }) => {
  return (
    <form
      action={async () => {
        "use server";
        await deleteDealAction(dealId);
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={16} />
      </Button>
    </form>
  );
};

const AdminDealsPage = async () => {
  const pathname = "/admin/deals";
  const deals = (await getDealsAction()) || [];

  return (
    <div className="p-4 md:p-8">
      <NavSummary pathname={pathname} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Deals</h1>
          <h2 className="text-sm text-gray-500">
            View and Manage all Deals and Offers
          </h2>
        </div>
        <Link href="/admin/deals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Deal
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Deal</th>
                <th className="px-6 py-3">Partner</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deals.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No deals found. Create one to get started!
                  </td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {deal.image_url && (
                          <div className="h-10 w-10 relative rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={deal.image_url}
                              alt={deal.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {deal.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {deal.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {deal.partners?.name || (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs">
                        <div>
                          Start:{" "}
                          {new Date(deal.start_date).toLocaleDateString()}
                        </div>
                        <div>
                          End: {new Date(deal.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {deal.original_price ? `$${deal.original_price}` : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs w-fit ${deal.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {deal.is_active ? "Active" : "Draft"}
                        </span>
                        {deal.is_featured && (
                          <span className="px-2 py-0.5 rounded-full text-xs w-fit bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {/* <Link href={`/admin/deals/${deal.id}/edit`}>
                           <Button variant="ghost" size="sm">
                             <Edit size={16} />
                           </Button>
                         </Link> */}
                        <DeleteButton dealId={deal.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDealsPage;
