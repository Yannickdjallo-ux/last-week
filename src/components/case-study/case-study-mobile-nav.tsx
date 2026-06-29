"use client"

import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"
import type { Project } from "@/data/projects"
import { getProjectMetadataLine, getProjectSections } from "@/data/projects"
import { cn } from "@/lib/utils"
import { useCaseStudyScroll } from "@/components/case-study/use-case-study-scroll"

type CaseStudyMobileNavProps = {
  project: Project
}

function ProgressRing({ progress }: { progress: number }) {
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      className="-rotate-90"
      aria-hidden
    >
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-grey-300"
      />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-orange-400 transition-[stroke-dashoffset] duration-150"
      />
    </svg>
  )
}

export function CaseStudyMobileNav({ project }: CaseStudyMobileNavProps) {
  const { activeSectionId, sectionProgress, scrollToSection } =
    useCaseStudyScroll()
  const [expanded, setExpanded] = useState(false)
  const sections = getProjectSections(project)
  const activeSection =
    sections.find((section) => section.id === activeSectionId) ?? sections[0]

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [expanded])

  if (!sections.length || !activeSection) return null

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex w-full items-stretch overflow-hidden rounded-2xl border border-grey-300 bg-grey-500 text-left shadow-lg"
        >
          <span className="flex items-center border-r border-grey-400 px-4 py-3 text-[10px] font-medium uppercase tracking-widest text-grey-300">
            {project.companyName}
          </span>

          <span className="relative flex flex-1 items-center px-4 py-3">
            <span
              className="absolute inset-y-0 left-0 bg-grey-400/40 transition-[width] duration-150"
              style={{ width: `${sectionProgress * 100}%` }}
              aria-hidden
            />
            <span className="relative text-xs font-medium uppercase tracking-widest text-grey-50">
              {activeSection.title}
            </span>
          </span>

          <span className="relative flex items-center justify-center px-3 py-3 text-grey-50">
            <ProgressRing progress={sectionProgress} />
            <Plus className="absolute size-3.5" strokeWidth={2} />
          </span>
        </button>
      </div>

      {expanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex-1 overflow-y-auto px-6 pb-28 pt-10">
            <div className="space-y-2 border-b border-grey-200 pb-8">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                {project.companyName}
              </h2>
              {project.tagline && (
                <p className="text-sm text-muted-foreground">
                  {project.tagline}
                </p>
              )}
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {getProjectMetadataLine(project)}
              </p>
            </div>

            <nav className="mt-2" aria-label="Case study sections">
              {sections.map((section) => {
                const isActive = activeSectionId === section.id

                return (
                  <div
                    key={section.id}
                    className="border-b border-grey-200 py-5"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        scrollToSection(section.id)
                        setExpanded(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 text-left text-sm",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          isActive ? "bg-orange-400" : "bg-transparent"
                        )}
                        aria-hidden
                      />
                      {section.title}
                    </button>

                    {isActive && (
                      <p className="mt-4 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="border-t border-grey-200 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="mx-auto flex items-center gap-2 rounded-lg border border-grey-200 bg-grey-50 px-4 py-2 text-xs font-medium uppercase tracking-widest text-foreground"
            >
              Close
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
