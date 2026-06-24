import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { getProjectById } from "@/data/projects"

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col px-9 pb-6 pt-10">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← Back to projects
      </Link>

      <section className="mt-6 space-y-4 pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            {project.year}
          </p>
          <Badge className="rounded-sm bg-orange-400 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-grey-50 hover:bg-orange-400">
            {project.role}
          </Badge>
        </div>
        <h1 className="text-3xl font-medium tracking-tight uppercase">
          {project.companyName}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-grey-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-sm border-grey-200 bg-grey-50 px-2 py-0.5 text-[10px] font-medium text-grey-500 hover:bg-grey-50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  )
}
