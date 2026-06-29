"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/ui/app-sidebar"

function isCaseStudyRoute(pathname: string) {
  return (
    pathname.startsWith("/projects/") &&
    pathname !== "/projects" &&
    pathname.split("/").length >= 3
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showAppSidebar = !isCaseStudyRoute(pathname)

  return (
    <>
      {showAppSidebar && <AppSidebar />}
      {children}
    </>
  )
}
