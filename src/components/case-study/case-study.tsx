"use client"

import type { Project } from "@/data/projects"
import { getProjectSections } from "@/data/projects"
import { CaseStudyContent } from "@/components/case-study/case-study-content"
import { CaseStudyMobileNav } from "@/components/case-study/case-study-mobile-nav"
import { CaseStudySidebar } from "@/components/case-study/case-study-sidebar"
import { CaseStudyScrollProvider } from "@/components/case-study/use-case-study-scroll"

type CaseStudyProps = {
  project: Project
}

export function CaseStudy({ project }: CaseStudyProps) {
  const sections = getProjectSections(project)

  return (
    <CaseStudyScrollProvider sections={sections}>
      <div className="flex min-h-full w-full">
        <CaseStudySidebar project={project} />
        <CaseStudyContent project={project} />
        <CaseStudyMobileNav project={project} />
      </div>
    </CaseStudyScrollProvider>
  )
}
