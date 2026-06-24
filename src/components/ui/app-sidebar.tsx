"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderKanban, MessageCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
] as const

const WHATSAPP_URL = "https://wa.me/3164205945"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r-0 group-data-[side=left]:border-r-0">
      <SidebarContent className="pt-10">
        <SidebarGroup className="px-6">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className="gap-3"
                  >
                    <Link href={href}>
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    <span>Chat with me</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
