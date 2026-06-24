import { ProjectCardSlider } from "@/components/ui/project-card-slider"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col px-9 pb-6 pt-10">
      <section className="space-y-1 pt-5">
        <p className="text-sm font-medium text-muted-foreground">Portfolio</p>
        <h1 className="text-3xl font-medium tracking-tight">Some of my favorite projects</h1>
      </section>

      <section className="mt-10">
        <ProjectCardSlider projects={projects} />
      </section>

      <footer className="mt-auto pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <p>© Yannickdjallo 2026</p>
        </div>
      </footer>
    </div>
  )
}
