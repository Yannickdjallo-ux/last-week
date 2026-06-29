"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ProjectCardFront } from "@/components/ui/project-card"
import type { Project } from "@/data/projects"
import { getProjectHref } from "@/data/projects"
import { cn } from "@/lib/utils"

type FlipProjectCardProps = {
  project: Project
  className?: string
}

export function FlipProjectCard({ project, className }: FlipProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const reduceMotion = useReducedMotion()
  const detailHref = getProjectHref(project)

  const toggleFlip = () => setIsFlipped((flipped) => !flipped)

  return (
    <div
      className={cn("w-[280px] shrink-0 [perspective:1000px]", className)}
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            toggleFlip()
          }
        }}
        aria-expanded={isFlipped}
        aria-label={`${project.companyName}. ${isFlipped ? "Showing details" : "Click to flip for details"}`}
        className="relative w-full cursor-pointer border-0 bg-transparent p-0 text-left [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 22 }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="[backface-visibility:hidden]">
          <ProjectCardFront project={project} />
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-2xl border-5 border-orange-400 bg-grey-100 p-4 text-grey-600 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <h3 className="text-lg font-semibold uppercase">
            {project.companyName}
          </h3>
          <p className="mt-3 flex-1 overflow-y-auto text-sm leading-relaxed text-grey-400">
            {project.description}
          </p>
          {project.comingSoon ? (
            <span
              className="mt-4 text-sm font-semibold text-muted-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              {project.cardLinkLabel ?? "Coming soon"}
            </span>
          ) : (
            <Link
              href={detailHref}
              onClick={(event) => event.stopPropagation()}
              className="mt-4 text-sm font-semibold text-orange-400 underline-offset-4 hover:underline"
            >
              {project.cardLinkLabel ?? "View project →"}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
