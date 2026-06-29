"use client"

import Link from "next/link"
import type { Project } from "@/data/projects"
import { getProjectCredits, getProjectMetadataLine, getProjectSections } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCaseStudyScroll } from "@/components/case-study/use-case-study-scroll"

type CaseStudySidebarProps = {
  project: Project
}

export function CaseStudySidebar({ project }: CaseStudySidebarProps) {
  const { activeSectionId, scrollToSection } = useCaseStudyScroll()
  const sections = getProjectSections(project)

  return (
    <aside className="sticky top-0 hidden h-svh w-72 shrink-0 self-start flex-col border-r border-grey-200 bg-background md:flex">
      <div className="flex flex-1 flex-col px-8 py-10">
        <nav className="mb-8 text-xs text-muted-foreground">
          <Link
            href="/projects"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{project.companyName}</span>
        </nav>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-medium tracking-tight">
            {project.companyName}
          </h1>
          {project.tagline && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
          )}
          <p className="pt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {getProjectMetadataLine(project)}
          </p>
        </div>

        <nav className="mt-12 space-y-4" aria-label="Case study sections">
          {sections.map((section) => {
            const isActive = activeSectionId === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex w-full items-center gap-3 text-left text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-colors",
                    isActive ? "bg-orange-400" : "bg-transparent"
                  )}
                  aria-hidden
                />
                {section.title}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-grey-200 pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {getProjectCredits(project)}
          </p>
          {project.websiteUrl ? (
            <Button asChild className="mt-4 w-full">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.websiteLabel ?? "Visit website"}
              </a>
            </Button>
          ) : (
            <Button className="mt-4 w-full" disabled>
              {project.websiteLabel ?? "Visit website"}
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
