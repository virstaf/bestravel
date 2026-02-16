"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/ui/loginForm";
// import SignupForm from "@/components/ui/signUpForm";
import SignupForm from "@/components/ui/signupForm";

export function AuthDialog({ open, onOpenChange, onSuccess }) {
  const [activeTab, setActiveTab] = React.useState("login");

  const handleSuccess = (user) => {
    if (onSuccess) {
      onSuccess(user);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl text-center">
            {activeTab === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login"
              ? "Login to access member-only deals"
              : "Sign up to unlock exclusive savings"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-1 pb-6">
            <TabsContent value="login" className="mt-0 border-0">
              <LoginForm
                redirect={false}
                onSuccess={(user) => handleSuccess(user)}
              />
            </TabsContent>
            <TabsContent value="signup" className="mt-0 border-0">
              <SignupForm
                redirect={false}
                onSuccess={(user) => {
                  // For signup, usually we wait for email verification, but we can close modal
                  // or show a "Check email" state. The form handles the toast.
                  // We might want to switch to login tab or just close if desired.
                  // For now, let's keep it open or just let the toast show.
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
