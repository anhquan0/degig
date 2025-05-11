"use client";

import React from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    window.addEventListener("unhandledrejection", (event) => {
      toast.error("Error", {
        description: event.reason.message || "An unknown error occurred",
      });
    });
  }
  return (
    <>
      <SWRConfig>{children}</SWRConfig>
    </>
  );
}
