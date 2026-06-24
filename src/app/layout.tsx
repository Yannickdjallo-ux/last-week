import type { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { clashGrotesk, satoshi } from "@/app/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Yannick — Portfolio",
  description: "Design Engineer and Creative based in Amsterdam",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${satoshi.variable} ${clashGrotesk.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
