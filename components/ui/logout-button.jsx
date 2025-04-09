"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/users";
import { Button } from "./button";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const errorMessage = await logoutAction();

    if (errorMessage.errorMessage === null) {
      toast.success("Logged out", {
        description: "You've been logged out successfully",
      });
      router.replace("/login");
    } else {
      console.error(errorMessage);

      toast.error("Logout failed", {
        description: errorMessage.errorMessage,
      });
    }

    setLoading(false);
  };
  return (
    <Button
      variant="outline"
      className="border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-100/50 w-24"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};

export default LogoutButton;
