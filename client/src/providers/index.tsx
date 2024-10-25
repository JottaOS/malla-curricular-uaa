import React from "react";
import { ThemeProvider } from "./theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};

export default Providers;
