"use client";
import { BookText, GraduationCap, Library, University } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-toggler";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  {
    title: "Facultades",
    url: "/facultades",
    icon: University,
  },
  {
    title: "Materias",
    url: "/materias",
    icon: Library,
  },
  {
    title: "Carreras",
    url: "/carreras",
    icon: GraduationCap,
  },
  {
    title: "Mallas Curriculares",
    url: "/mallas",
    icon: BookText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-row justify-between items-center gap-4 pt-4">
        <Image
          width={64}
          height={64}
          className="object-contain"
          src={"/favicon.ico"}
          alt="Logo de la UAA"
        />
        {state === "expanded" && (
          <span className="font-semibold text-pretty leading-snug">
            Universidad Autónoma de Asunción
          </span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      pathname.includes(item.url) ? "text-primary" : ""
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <ModeToggle />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
