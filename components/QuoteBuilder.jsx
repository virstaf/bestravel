"use client";

import {
  createQuote,
  createQuoteItems,
  getUserFromTripId,
} from "@/actions/admin/quotes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import QuoteItem from "./ui/quote-item";
import {
  modifyReservationsStatus,
  modifyReservationStatus,
} from "@/actions/admin/reservation";
import { RESERVATION_STATUS } from "@/lib/constants/statuses";
import { resendEmail } from "@/actions/resendEmail";

const QuoteBuilder = ({ tripId, trip, userId, reservations }) => {
  const router = useRouter();
  const [quoteItems, setQuoteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    admin_notes: "",
    client_notes: "",
    valid_until: "",
  });

  // Add a new quote item
  const addQuoteItem = (reservationId, reservationType) => {
    const newItem = {
      id: `temp-${Date.now()}`,
      reservation_id: reservationId,
      reservation_type: reservationType,
      category: "standard",
      description: "",
      supplier: "",
      price: "",
      quantity: 1,
      is_selected: false,
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  // Update quote item
  const updateQuoteItem = (itemId, field, value) => {
    setQuoteItems(
      quoteItems.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  // Remove quote item
  const removeQuoteItem = (itemId) => {
    setQuoteItems(quoteItems.filter((item) => item.id !== itemId));
  };

  // Calculate total
  const calculateTotal = () => {
    return quoteItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
  };

  // Save quote to Supabase
  const saveQuote = async (status = "draft") => {
    if (quoteItems.length === 0) {
      toast.error("Please add at least one quote item");
      return;
    }

    setLoading(true);

    const payload = {
      trip_id: tripId,
      user_id: trip?.user_id, // Link quote to the trip's user
      status: status,
      admin_notes: formData.admin_notes,
      client_notes: formData.client_notes,
      total_amount: calculateTotal(),
      valid_until: formData.valid_until || null,
      created_by: userId,
    };

    try {
      // Create the quote
      const {
        success: quoteSuccess,
        data: quote,
        error: quoteError,
      } = await createQuote(payload);
      if (!quoteSuccess || quoteError) {
        console.log("Error creating quote", quoteError);
        throw new Error(quoteError || "Error creating quote");
      }

      // Create quote items
      const quoteItemsData = quoteItems.map((item) => ({
        quote_id: quote.id,
        reservation_id: item.reservation_id,
        reservation_type: item.reservation_type,
        category: item.category,
        description: item.description,
        supplier: item.supplier,
        price: parseFloat(item.price),
        quantity: item.quantity,
        is_selected: item.is_selected,
        sort_order: 0,
      }));

      const reservationIds = quoteItems.map((item) => item.reservation_id);
      const firstReservationId = reservationIds[0];
      console.log("reservation Id", firstReservationId);

      const { success: itemsSuccess, error: itemsError } =
        await createQuoteItems(quoteItemsData);
      if (!itemsSuccess || itemsError) {
        console.log("Error creating quote items", itemsError);
        throw new Error(itemsError || "Error creating quote items");
      }

      const reservationError = await modifyReservationsStatus(
        reservationIds,
        RESERVATION_STATUS.IN_REVIEW
      );
      if (reservationError) {
        console.log("reservationError", reservationError);
        console.log("Error updating reservation status", reservationError);
        // throw new Error("Error updating reservation status")
      }

      // Send email notification only when status is "sent"
      if (status === "sent") {
        try {
          const { success: userSuccess, data: userData } =
            await getUserFromTripId(tripId);

          if (userSuccess && userData) {
            const dashboardLink = `${process.env.NEXT_PUBLIC_BASEURL || "https://virstravelclub.com"}/dashboard/bookings`;

            const emailResult = await resendEmail(
              {
                fullname: userData.fullname,
                email: userData.email,
                quoteDetails: {
                  quoteNumber: quote.quote_number,
                  tripName: userData.tripName,
                  totalAmount: calculateTotal(),
                  validUntil: formData.valid_until,
                  clientNotes: formData.client_notes,
                  dashboardLink: dashboardLink,
                },
              },
              "quote-notification"
            );

            if (!emailResult.success) {
              console.error(
                "Error sending quote notification email:",
                emailResult.message
              );
              // Don't throw error - quote was created successfully
            }
          } else {
            console.error(
              "Could not fetch user details for email notification"
            );
          }
        } catch (emailError) {
          console.error("Error in email notification process:", emailError);
          // Don't throw error - quote was created successfully
        }
      }

      toast.success(
        `Quote ${status === "draft" ? "saved as draft" : "sent to client"} successfully!`
      );
      router.push("/admin/quotes");

      // Reset form
      setQuoteItems([]);
      setFormData({ admin_notes: "", client_notes: "", valid_until: "" });
    } catch (error) {
      console.error("Error saving quote:", error);
      toast.error("Error saving quote: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Create New Quote</h2>
        <p className="text-sm text-gray-600">
          {/* Build a customized quote with multiple options */}
          {trip?.destination || "Trip"}
        </p>
      </div>

      {/* Reservations List */}
      <div className="space-y-3">
        <h3 className="font-semibold">Trip Reservations</h3>
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <QuoteItem reservation={reservation} addQuoteItem={addQuoteItem} />
          </div>
        ))}

        {reservations.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No reservations found for this trip.
          </div>
        )}
      </div>

      {/* Quote Items */}
      {quoteItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Quote Options</h3>

          {/* Group items by reservation */}
          {reservations.map((reservation) => {
            const reservationItems = quoteItems.filter(
              (item) => item.reservation_id === reservation.id
            );
            if (reservationItems.length === 0) return null;

            return (
              <div key={reservation.id} className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium capitalize">
                    {reservation.type} Options
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  {reservationItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 border rounded"
                    >
                      {/* Category */}
                      <select
                        value={item.category}
                        onChange={(e) =>
                          updateQuoteItem(item.id, "category", e.target.value)
                        }
                        className="p-2 border rounded md:col-span-2"
                      >
                        <option value="economy">Economy</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="business">Business</option>
                        <option value="luxury">Luxury</option>
                      </select>

                      {/* Description */}
                      <input
                        type="text"
                        placeholder="Description (e.g., Flight AA 245 JFK-LAX)"
                        value={item.description}
                        onChange={(e) =>
                          updateQuoteItem(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded md:col-span-4"
                      />

                      {/* Supplier */}
                      <input
                        type="text"
                        placeholder="Supplier"
                        value={item.supplier}
                        onChange={(e) =>
                          updateQuoteItem(item.id, "supplier", e.target.value)
                        }
                        className="p-2 border rounded md:col-span-2"
                      />

                      {/* Price */}
                      <input
                        type="number"
                        placeholder="Price (£)"
                        value={item.price}
                        onChange={(e) =>
                          updateQuoteItem(item.id, "price", e.target.value)
                        }
                        className="p-2 border rounded md:col-span-2"
                      />

                      {/* Actions */}
                      <div className="flex gap-2 md:col-span-2">
                        <button
                          onClick={() => removeQuoteItem(item.id)}
                          className="px-2 py-1 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notes Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Admin Notes (Internal)
          </label>
          <textarea
            value={formData.admin_notes}
            onChange={(e) =>
              setFormData({ ...formData, admin_notes: e.target.value })
            }
            placeholder="Internal notes for other admins..."
            rows="3"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Client Notes</label>
          <textarea
            value={formData.client_notes}
            onChange={(e) =>
              setFormData({ ...formData, client_notes: e.target.value })
            }
            placeholder="Notes and instructions for the client..."
            rows="3"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Validity Period */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Quote Valid Until
        </label>
        <input
          type="date"
          value={formData.valid_until}
          onChange={(e) =>
            setFormData({ ...formData, valid_until: e.target.value })
          }
          className="p-2 border rounded"
        />
        <p className="text-sm text-gray-600 mt-1">
          Leave empty if no expiration
        </p>
      </div>

      {/* Summary and Actions */}
      <div className="flex justify-end items-center border-t pt-4">
        {/* <div className="text-lg font-semibold">
          Total: ${calculateTotal().toFixed(2)}
        </div> */}
        <div className="flex gap-3">
          <button
            onClick={() => saveQuote("draft")}
            disabled={loading || quoteItems.length === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => saveQuote("sent")}
            disabled={loading || quoteItems.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send to Client"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteBuilder;
