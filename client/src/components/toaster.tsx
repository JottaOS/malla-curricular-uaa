"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster as BaseToaster } from "@/components/ui/sonner";

const Toaster = () => {
  const { theme } = useTheme();
  return (
    <BaseToaster
      richColors
      closeButton
      duration={5000}
      theme={theme as "light" | "dark" | "system"}
    />
  );
};

export default Toaster;
