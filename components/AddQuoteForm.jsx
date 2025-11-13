"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createCustomQuote } from "@/actions/admin/quotes";
import { toast } from "sonner";

const initialTypes = [
  {
    type: "transfer",
    label: "Transfer",
    count: 0,
  },
  {
    type: "hotel",
    label: "Hotel",
    count: 0,
  },
  {
    type: "flight",
    label: "Flight",
    count: 0,
  },
];

const resClassOptions = [
  {
    type: "transfer",
    label: "Transfer",
    options: [
      { name: "Airport Transfer", value: "airport" },
      { name: "Hotel Transfer", value: "hotel" },
      { name: "City Transfer", value: "city" },
      { name: "Cruise Port Transfer", value: "cruise-port" },
    ],
  },
  {
    type: "hotel",
    label: "Hotel",
    options: [
      { name: "Economy", value: "economy" },
      { name: "Standard", value: "standard" },
      { name: "Premium", value: "premium" },
      { name: "Business", value: "business" },
      { name: "Luxury", value: "luxury" },
    ],
  },
  {
    type: "flight",
    label: "Flight",
    options: [
      { name: "Economy", value: "economy" },
      { name: "Premium Economy", value: "premium" },
      { name: "Business", value: "business" },
      { name: "First Class", value: "first" },
    ],
  },
];

const AddQuoteForm = ({ adminId }) => {
  const [quoteItems, setQuoteItems] = useState({});
  const [reservationTypes, setReservationTypes] = useState(initialTypes);

  const handleAddOption = (reservation) => {
    setReservationTypes((prev) => {
      return prev.map((item) =>
        item.type === reservation.type
          ? { ...item, count: item.count + 1 }
          : item
      );
    });
  };

  const handleInputChange = (reservationType, index, field, value) => {
    setQuoteItems((prev) => ({
      ...prev,
      [`${reservationType}-${index}`]: {
        ...prev[`${reservationType}-${index}`],
        [field]: value,
      },
    }));
  };

  const handleAddQuote = async (formData) => {
    try {
      const { error } = await createCustomQuote(formData);
      if (error) {
        throw error;
      }
      toast.success("Quote sent successfully!");
    } catch (err) {
      toast.error("Sending quote failed!");
    }
  };

  return (
    <div className="flex flex-col justify-start bg-white rounded-lg p-4 w-full max-w-5xl my-8">
      <form action={handleAddQuote} className="w-full h-full">
        <div className="options w-full space-y-3">
          <h3 className="font-semibold">Trip Reservations</h3>
          <div className="grid lg:grid-cols-3 gap-3">
            {initialTypes.map((reservation) => (
              <div
                key={reservation.type}
                className="flex items-center justify-between border rounded-lg p-2"
              >
                <p>{reservation.label}</p>
                <Button
                  type="button"
                  onClick={() => handleAddOption(reservation)}
                >
                  Add Option
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="quote-items w-full space-y-3 mt-8">
          <h3 className="font-semibold">Quote Items</h3>
          {reservationTypes
            .filter((item) => item.count > 0)
            .map((item) => (
              <div key={item.type} className="border rounded p-4 mb-4">
                <h4 className="font-medium mb-3">
                  {item.label} ({item.count})
                </h4>

                {Array.from({ length: item.count }, (_, index) => (
                  <div
                    key={`${item.type}-${index}`}
                    className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2 border rounded p-4 mb-2"
                  >
                    <Input name="Type" hidden value={item.type} />
                    <Select name="category">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {resClassOptions
                          .find((category) => category.type === item.type)
                          ?.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Input name="description" placeholder="Description" />
                    <Input name="supplier" placeholder="Supplier" />
                    <Input name="price" placeholder="Price" />
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="user-details w-full space-y-3 mt-8">
          <h3 className="font-semibold">User Details</h3>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2 border rounded p-4 mb-4">
            <Input name="AdminId" hidden value={adminId} />
            <Input name="fullname" placeholder="Full name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="phone_number" placeholder="Phone number" />
            <Input name="country" placeholder="Country" />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outlineDestructive">
            Clear
          </Button>
          <Button>Send to Client</Button>
        </div>
      </form>
    </div>
  );
};

export default AddQuoteForm;
