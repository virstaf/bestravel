"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Plus, Upload, Loader2, Check, Shield } from "lucide-react";
import { updateProfileAction } from "@/actions/profiles";
import { toast } from "sonner";

// Countries list
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "Nigeria",
  "South Africa",
  "Kenya",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Australia",
  "New Zealand",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Argentina",
  "UAE",
];

const POPULAR_DESTINATIONS = [
  "Paris",
  "Dubai",
  "Cape Town",
  "London",
  "New York",
  "Tokyo",
  "Barcelona",
  "Bali",
  "Maldives",
  "Santorini",
];

const ProfileForm = ({ profile, className }) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    country: profile?.home_country || profile?.country || "",
    website: profile?.website || "",
    public_email: profile?.public_email || "",
    avatar_url: profile?.avatar_url || "",
    preferred_destinations: profile?.preferred_destinations || [],
    travel_frequency: profile?.travel_frequency || "3-5 trips/year",
    // Billing information
    date_of_birth: profile?.date_of_birth || "",
    address_line1: profile?.address_line1 || "",
    address_line2: profile?.address_line2 || "",
    city: profile?.city || "",
    postal_code: profile?.postal_code || "",
    billing_country: profile?.billing_country || "",
  });

  const [customDestination, setCustomDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const router = useRouter();

  // Track changes
  useEffect(() => {
    const initialData = {
      full_name: profile?.full_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      phone: profile?.phone || "",
      country: profile?.home_country || profile?.country || "",
      website: profile?.website || "",
      public_email: profile?.public_email || "",
      avatar_url: profile?.avatar_url || "",
      preferred_destinations: profile?.preferred_destinations || [],
      travel_frequency: profile?.travel_frequency || "3-5 trips/year",
      date_of_birth: profile?.date_of_birth || "",
      address_line1: profile?.address_line1 || "",
      address_line2: profile?.address_line2 || "",
      city: profile?.city || "",
      postal_code: profile?.postal_code || "",
      billing_country: profile?.billing_country || "",
    };

    const changed = JSON.stringify(formData) !== JSON.stringify(initialData);
    setHasChanges(changed);
  }, [formData, profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await updateProfileAction(formData);

      if (!result.success) throw new Error(result.error);

      toast.success("Profile updated successfully!");
      setHasChanges(false);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDestination = (destination) => {
    if (formData.preferred_destinations.length >= 5) return;
    if (!formData.preferred_destinations.includes(destination)) {
      setFormData({
        ...formData,
        preferred_destinations: [
          ...formData.preferred_destinations,
          destination,
        ],
      });
    }
  };

  const handleRemoveDestination = (destination) => {
    setFormData({
      ...formData,
      preferred_destinations: formData.preferred_destinations.filter(
        (d) => d !== destination,
      ),
    });
  };

  const handleAddCustomDestination = () => {
    if (
      customDestination.trim() &&
      formData.preferred_destinations.length < 5
    ) {
      handleAddDestination(customDestination.trim());
      setCustomDestination("");
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      website: profile?.website || "",
      public_email: profile?.public_email || "",
      avatar_url: profile?.avatar_url || "",
      country: profile?.home_country || profile?.country || "",
      phone: profile?.phone || "",
      preferred_destinations: profile?.preferred_destinations || [],
      travel_frequency: profile?.travel_frequency || "3-5 trips/year",
      date_of_birth: profile?.date_of_birth || "",
      address_line1: profile?.address_line1 || "",
      address_line2: profile?.address_line2 || "",
      city: profile?.city || "",
      postal_code: profile?.postal_code || "",
      billing_country: profile?.billing_country || "",
    });
    setHasChanges(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile?.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setFormData({ ...formData, avatar_url: publicUrl });
      toast.success("Avatar uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} space-y-6 max-w-4xl mx-auto`}
    >
      {/* Profile Picture Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update your profile photo. Recommended size: 400x400px
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={formData.avatar_url} />
              <AvatarFallback className="text-2xl">
                {profile?.username?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <label
                htmlFor="avatar"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {uploadingAvatar ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload New Photo
                  </>
                )}
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploadingAvatar}
              />
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="customer_id">Membership ID</Label>
              <Input
                id="customer_id"
                value={profile?.customer_id}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Share this ID when contacting support
              </p>
            </div>
            {/* <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="johndoe"
              />
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="public_email">Email</Label>
              <Input
                id="public_email"
                type="email"
                value={formData.public_email}
                onChange={(e) =>
                  setFormData({ ...formData, public_email: e.target.value })
                }
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) =>
                setFormData({ ...formData, date_of_birth: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground mt-1">
              Required for flight bookings and age verification
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Location Card */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>
            Where are you based? This helps us personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="country">Home Country</Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-500" />
            <CardTitle>Billing Address</CardTitle>
          </div>
          <CardDescription>
            Your billing information is encrypted and secure. Only used for
            payment processing and booking verification. We never share your
            data with third parties.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address_line1">
              Address Line 1 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address_line1"
              value={formData.address_line1}
              onChange={(e) =>
                setFormData({ ...formData, address_line1: e.target.value })
              }
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <Label htmlFor="address_line2">
              Address Line 2{" "}
              <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Input
              id="address_line2"
              value={formData.address_line2}
              onChange={(e) =>
                setFormData({ ...formData, address_line2: e.target.value })
              }
              placeholder="Apartment, suite, unit, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">
                Town / City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="New York"
              />
            </div>

            <div>
              <Label htmlFor="postal_code">
                Post Code / ZIP <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postal_code"
                value={formData.postal_code}
                onChange={(e) =>
                  setFormData({ ...formData, postal_code: e.target.value })
                }
                placeholder="10001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="billing_country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.billing_country}
              onValueChange={(value) =>
                setFormData({ ...formData, billing_country: value })
              }
            >
              <SelectTrigger id="billing_country" className="w-full">
                <SelectValue placeholder="Select billing country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              This may differ from your home country
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Preferences</CardTitle>
          <CardDescription>
            Tell us about your travel style to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">Preferred Destinations</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select up to 5 destinations you love to visit
            </p>

            {/* Selected Destinations */}
            {formData.preferred_destinations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.preferred_destinations.map((dest) => (
                  <Badge
                    key={dest}
                    variant="secondary"
                    className="cursor-pointer px-3 py-1.5 text-sm"
                  >
                    {dest}
                    <X
                      className="ml-1.5 h-3 w-3"
                      onClick={() => handleRemoveDestination(dest)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Popular Destinations */}
            <div className="flex flex-wrap gap-2 mb-3">
              {POPULAR_DESTINATIONS.filter(
                (dest) => !formData.preferred_destinations.includes(dest),
              )
                .slice(0, 5)
                .map((dest) => (
                  <Badge
                    key={dest}
                    variant="outline"
                    className="cursor-pointer px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
                    onClick={() => handleAddDestination(dest)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {dest}
                  </Badge>
                ))}
            </div>

            {/* Custom Destination Input */}
            {formData.preferred_destinations.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom destination..."
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomDestination();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddCustomDestination}
                  disabled={!customDestination.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {formData.preferred_destinations.length}/5 destinations selected
            </p>
          </div>

          <div>
            <Label className="mb-3 block">Travel Frequency</Label>
            <RadioGroup
              value={formData.travel_frequency}
              onValueChange={(value) =>
                setFormData({ ...formData, travel_frequency: value })
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="1-2 trips/year" id="freq-1" />
                <Label
                  htmlFor="freq-1"
                  className="flex-1 cursor-pointer font-normal"
                >
                  1–2 trips / year
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="3-5 trips/year" id="freq-2" />
                <Label
                  htmlFor="freq-2"
                  className="flex-1 cursor-pointer font-normal"
                >
                  3–5 trips / year
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Frequent traveler" id="freq-3" />
                <Label
                  htmlFor="freq-3"
                  className="flex-1 cursor-pointer font-normal"
                >
                  Frequent traveler
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* About Card */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Tell us a bit about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              placeholder="Share a little about yourself and your travel experiences..."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.bio?.length || 0} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="p-4 text-red-500 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t -mx-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {hasChanges && !loading && (
            <>
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              Unsaved changes
            </>
          )}
          {loading && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          )}
          {!hasChanges && !loading && (
            <>
              <Check className="h-4 w-4 text-green-500" />
              All changes saved
            </>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={!hasChanges || loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!hasChanges || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
