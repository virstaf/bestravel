"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "./ui/label";

const ProfileForm = ({ profile }) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    country: profile?.country || "",
    website: profile?.website || "",
    public_email: profile?.public_email || "",
    avatar_url: profile?.avatar_url || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", profile?.id);

      if (error) throw error;
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      country: profile?.country || "",
      phone: profile?.phone || "",
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={formData.avatar_url} />
          <AvatarFallback>
            {profile?.full_name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-2">
            Change Avatar
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark"
          />
        </div>
      </div>

      <div>
        <label htmlFor="customer_id" className="block text-sm font-medium mb-1">
          Your Customer ID
        </label>
        <Input
          id="customer_id"
          value={profile?.customer_id}
          readOnly
          className="bg-gray-100 cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Share this ID when contacting support
        </p>
      </div>

      <div className="username">
        <Label htmlFor="username" className="mb-1">
          Username
        </Label>
        <Input
          id="username"
          value={profile?.username}
          readOnly
          className="bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <Label htmlFor="full_name" className="mb-1">
          Full Name
        </Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
      </div>

      <div className="email">
        <Label htmlFor="public_email" className="mb-1">
          Email
        </Label>
        <Input
          id="public_email"
          type="email"
          value={formData.public_email}
          onChange={(e) =>
            setFormData({ ...formData, public_email: e.target.value })
          }
        />
      </div>

      <div className="phone">
        <Label htmlFor="phone" className="mb-1">
          Phone
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="country">
        <Label htmlFor="country" className="mb-1">
          Country
        </Label>
        <Input
          id="country"
          type="country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />
      </div>

      <div className="bio">
        <Label htmlFor="bio" className="mb-1">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
          placeholder="Tell us about yourself"
        />
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
      )}
      <div className="buttons flex justify-between">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
