"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlipProjectCard } from "@/components/ui/flip-project-card"
import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

const CARD_WIDTH = 280
const CARD_GAP = 24

type ProjectCardSliderProps = {
  projects: Project[]
}

export function ProjectCardSlider({ projects }: ProjectCardSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const getScrollStep = useCallback(() => CARD_WIDTH + CARD_GAP, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return

      const clamped = Math.max(0, Math.min(index, projects.length - 1))
      el.scrollTo({ left: clamped * getScrollStep(), behavior: "smooth" })
      setActiveIndex(clamped)
    },
    [getScrollStep, projects.length]
  )

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / getScrollStep())
      setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)))
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [getScrollStep, projects.length])

  return (
    <div className="space-y-6">
      <div
        ref={scrollRef}
        className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <FlipProjectCard
            key={project.id}
            project={project}
            className="shrink-0"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9 rounded-full"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Project slides"
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-label={`Go to ${project.companyName}`}
              aria-selected={index === activeIndex}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === activeIndex ? "bg-orange-400" : "bg-grey-300"
              )}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9 rounded-full"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          aria-label="Next project"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
