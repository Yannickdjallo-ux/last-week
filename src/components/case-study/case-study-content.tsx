import Link from "next/link"
import type { Project } from "@/data/projects"
import { getProjectMetadataLine, getProjectSections } from "@/data/projects"
import { CaseStudyImageGrid } from "@/components/case-study/case-study-image"

type CaseStudyContentProps = {
  project: Project
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const sections = getProjectSections(project)

  return (
    <main className="min-w-0 flex-1 pb-28 md:pb-16">
      <div className="px-6 py-8 md:hidden">
        <Link
          href="/projects"
          className="mb-6 inline-flex size-9 items-center justify-center rounded-lg border border-grey-200 bg-grey-50 text-sm text-foreground"
          aria-label="Back to projects"
        >
          ←
        </Link>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-medium tracking-tight">
            {project.companyName}
          </h1>
          {project.tagline && (
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
          )}
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {getProjectMetadataLine(project)}
          </p>
        </div>

        <p className="mt-6 text-base leading-relaxed text-grey-400">
          {project.description}
        </p>
      </div>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-6 px-6 py-12 md:scroll-mt-0 md:px-12 md:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {section.title}
            </p>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-grey-400 md:ml-auto md:max-w-xl">
              {section.description}
            </p>

            {section.images && section.images.length > 0 && (
              <div className="mt-10">
                <CaseStudyImageGrid images={section.images} />
              </div>
            )}
          </div>
        </section>
      ))}

    </main>
  )
}
