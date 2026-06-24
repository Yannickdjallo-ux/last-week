"use client"

import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="mt-10 flex h-14 items-center bg-background px-10">
      <div className="mx-auto flex w-full max-w-[976px] items-center gap-4">
        <div className="flex flex-1" />
        <div className="flex items-center gap-2">
          <Button size="sm" className="rounded-[10px]">
            Chat with me
          </Button>
        </div>
      </div>
    </header>
  )
}
