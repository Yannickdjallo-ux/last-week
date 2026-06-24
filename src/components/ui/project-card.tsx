import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  project: Project
  className?: string
}

export function ProjectCardFront({ project, className }: ProjectCardProps) {
  const {
    companyName,
    role,
    image,
    description,
    year,
    tags,
  } = project

  return (
    <Card
      className={cn(
        "w-[280px] shrink-0 gap-4 rounded-2xl border-5 border-orange-400 bg-grey-100 py-4 text-grey-600 shadow-sm",
        className
      )}
    >
      <CardHeader className="px-4">
        <CardTitle className="text-lg font-semibold uppercase">
          {companyName}
        </CardTitle>
        <CardAction>
          <Badge className="rounded-sm bg-orange-400 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-grey-50 hover:bg-orange-400">
            {role}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-orange-100">
          {image ? (
            <Image
              src={image}
              alt={`${companyName} project`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-400/30">
              <span className="text-5xl font-bold text-orange-400/40">
                {companyName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-grey-400">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto items-end justify-between gap-3 px-4">
        <span className="text-sm font-semibold text-orange-400">{year}</span>
        <div className="flex flex-wrap justify-end gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-sm border-grey-200 bg-grey-50 px-2 py-0.5 text-[10px] font-medium text-grey-500 hover:bg-grey-50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { href } = project
  const card = <ProjectCardFront project={project} className={className} />

  if (href) {
    return (
      <Link href={href} className="block transition-transform hover:scale-[1.02]">
        {card}
      </Link>
    )
  }

  return card
}
