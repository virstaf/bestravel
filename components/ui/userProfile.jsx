import React from "react";
import CurrentUserAvatar from "../current-user-avatar";
import LogoutButton from "./logout-button";

const UserProfile = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <CurrentUserAvatar />
      <LogoutButton />
    </div>
  );
};

export default UserProfile;
