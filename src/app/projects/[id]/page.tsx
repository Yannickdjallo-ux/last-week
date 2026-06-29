import { notFound } from "next/navigation"
import { CaseStudy } from "@/components/case-study/case-study"
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

  return <CaseStudy project={project} />
}
