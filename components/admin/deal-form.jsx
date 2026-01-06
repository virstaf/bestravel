"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createDealAction,
  updateDealAction,
  getPartnersListAction,
} from "@/actions/deals";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AddressInput from "@/components/ui/addressInput";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const DealForm = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState("");

  const [locationPrices, setLocationPrices] = useState(
    initialData?.location_prices || []
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    partner_id: initialData?.partner_id || "",
    start_date: initialData?.start_date
      ? initialData.start_date.split("T")[0]
      : "",
    end_date: initialData?.end_date ? initialData.end_date.split("T")[0] : "",
    discount_percentage: initialData?.discount_percentage || "",
    discount_amount: initialData?.discount_amount || "",
    original_price: initialData?.original_price || "",
    promo_code: initialData?.promo_code || "",
    package_type: initialData?.package_type || "",
    duration_nights: initialData?.duration_nights || "4",
    location: initialData?.location || "",
    image_url: initialData?.image_url || "",
    includes_flight: initialData?.includes_flight !== false,
    includes_hotel: initialData?.includes_hotel !== false,
    includes_transfer: initialData?.includes_transfer || false,
    is_active: initialData?.is_active !== false,
    is_featured: initialData?.is_featured || false,
  });

  useEffect(() => {
    const fetchPartners = async () => {
      const data = await getPartnersListAction();
      setPartners(data || []);
    };
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Location Pricing Handlers
  const addLocationPrice = () => {
    setLocationPrices([
      ...locationPrices,
      { location: "", price: "", original_price: "" },
    ]);
  };

  const removeLocationPrice = (index) => {
    const newPrices = [...locationPrices];
    newPrices.splice(index, 1);
    setLocationPrices(newPrices);
  };

  const handleLocationPriceChange = (index, field, value) => {
    const newPrices = [...locationPrices];
    newPrices[index][field] = value;
    setLocationPrices(newPrices);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `deal-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let bucketName = "deals";

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        "Failed to upload image. Make sure 'deals' bucket exists and is public."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate
      if (!formData.title || !formData.start_date || !formData.end_date) {
        throw new Error("Please fill in required fields (Title, Dates)");
      }

      // Validate discount configuration
      if (formData.discount_percentage && formData.discount_amount) {
        throw new Error(
          "Please specify either discount percentage OR discount amount, not both"
        );
      }

      // Validate discount amount doesn't exceed original price
      if (formData.discount_amount && formData.original_price) {
        const discountAmt = parseFloat(formData.discount_amount);
        const originalPrc = parseFloat(formData.original_price);
        if (discountAmt >= originalPrc) {
          throw new Error(
            "Discount amount cannot be greater than or equal to original price"
          );
        }
      }

      // Validate discount percentage range
      if (formData.discount_percentage) {
        const percentage = parseInt(formData.discount_percentage);
        if (percentage < 0 || percentage > 100) {
          throw new Error("Discount percentage must be between 0 and 100");
        }
      }

      // Validate location prices
      locationPrices.forEach((lp, index) => {
        if (lp.price && lp.original_price) {
          const salePrice = parseFloat(lp.price);
          const origPrice = parseFloat(lp.original_price);
          if (salePrice > origPrice) {
            throw new Error(
              `Location ${index + 1}: Sale price cannot exceed original price`
            );
          }
        }
      });

      // Format data types
      const payload = {
        ...formData,
        discount_percentage: formData.discount_percentage
          ? parseInt(formData.discount_percentage)
          : null,
        discount_amount: formData.discount_amount
          ? parseFloat(formData.discount_amount)
          : null,
        original_price: formData.original_price
          ? parseFloat(formData.original_price)
          : null,
        duration_nights: formData.duration_nights
          ? parseInt(formData.duration_nights)
          : null,
        partner_id: formData.partner_id || null,
        location_prices: locationPrices.filter((lp) => lp.location && lp.price), // Clean empty
      };

      let result;
      if (initialData?.id) {
        result = await updateDealAction(initialData.id, payload);
      } else {
        result = await createDealAction(payload);
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      router.push("/admin/deals");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm border"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Deal" : "Create New Deal"}
        </h2>
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      {/* Main Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Deal Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Romantic Paris Getaway"
              required
            />
          </div>

          <div>
            <Label htmlFor="partner_id">Partner</Label>
            <Select
              value={formData.partner_id}
              onValueChange={(val) => handleSelectChange("partner_id", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a partner" />
              </SelectTrigger>
              <SelectContent>
                {partners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="package_type">Package Type</Label>
            <Input
              id="package_type"
              name="package_type"
              value={formData.package_type}
              onChange={handleChange}
              placeholder="e.g. All-Inclusive Resort"
            />
          </div>

          <div>
            <Label htmlFor="location">Location (Override)</Label>
            <AddressInput
              placeholder="e.g. Maldives"
              value={formData.location}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <Label>Deal Image</Label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative h-[250px]">
            {formData.image_url ? (
              <div className="relative w-full h-full">
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image_url: "" }))
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Click to upload image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={loading}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      {/* Pricing & Dates */}
      <h3 className="font-semibold text-lg pt-4 border-t">
        Pricing & Availability
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="start_date">Start Date *</Label>
          <Input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date *</Label>
          <Input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration_nights">Duration (Nights)</Label>
          <Input
            type="number"
            id="duration_nights"
            name="duration_nights"
            value={formData.duration_nights}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <Label htmlFor="original_price">Original Price</Label>
          <Input
            type="number"
            id="original_price"
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="discount_amount">Discount Amount</Label>
          <Input
            type="number"
            id="discount_amount"
            name="discount_amount"
            value={formData.discount_amount}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="discount_percentage">Discount %</Label>
          <Input
            type="number"
            id="discount_percentage"
            name="discount_percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="promo_code">Promo Code</Label>
          <Input
            id="promo_code"
            name="promo_code"
            value={formData.promo_code}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Location Based Pricing */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Location Based Pricing</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLocationPrice}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Location
          </Button>
        </div>

        {locationPrices.length > 0 ? (
          <div className="space-y-3">
            {locationPrices.map((lp, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label className="text-xs mb-1 block">
                    Departure Location
                  </Label>
                  <AddressInput
                    placeholder="e.g. London"
                    value={lp.location}
                    onChange={(value) =>
                      handleLocationPriceChange(index, "location", value)
                    }
                    searchOptions={{ types: ["(cities)"] }}
                  />
                </div>
                <div className="w-28">
                  <Label className="text-xs mb-1 block">Original Amt</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={lp.original_price || ""}
                    onChange={(e) =>
                      handleLocationPriceChange(
                        index,
                        "original_price",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="w-28">
                  <Label className="text-xs mb-1 block">Sale Amt</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={lp.price}
                    onChange={(e) =>
                      handleLocationPriceChange(index, "price", e.target.value)
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLocationPrice(index)}
                  className="mb-0.5"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No specific location pricing added.
          </p>
        )}
      </div>

      {/* Toggles */}
      <h3 className="font-semibold text-lg pt-4 border-t">
        Settings & Inclusions
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="includes_flight">Includes Flight</Label>
            <Checkbox
              id="includes_flight"
              checked={formData.includes_flight}
              onCheckedChange={(c) => handleSwitchChange("includes_flight", c)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="includes_hotel">Includes Hotel</Label>
            <Checkbox
              id="includes_hotel"
              checked={formData.includes_hotel}
              onCheckedChange={(c) => handleSwitchChange("includes_hotel", c)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="includes_transfer">Includes Transfer</Label>
            <Checkbox
              id="includes_transfer"
              checked={formData.includes_transfer}
              onCheckedChange={(c) =>
                handleSwitchChange("includes_transfer", c)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <Label htmlFor="is_active">Is Active</Label>
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(c) => handleSwitchChange("is_active", c)}
            />
          </div>
          <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
            <Label htmlFor="is_featured">Is Featured</Label>
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(c) => handleSwitchChange("is_featured", c)}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Deal" : "Create Deal"}
        </Button>
      </div>
    </form>
  );
};

export default DealForm;
