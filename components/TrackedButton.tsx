"use client";

import React, { ReactNode } from "react";
import { trackEvent, ClickCtaParams } from "@/lib/analytics";

interface TrackedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ctaName: string;
  ctaId?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A wrapper button component that automatically tracks the "click_cta" event
 * when clicked, before firing the provided onClick handler.
 */
export const TrackedButton = ({
  children,
  ctaName,
  ctaId,
  onClick,
  ...props
}: TrackedButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fire analytics event
    trackEvent("click_cta", {
      cta_name: ctaName,
      cta_id: ctaId,
    });

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
