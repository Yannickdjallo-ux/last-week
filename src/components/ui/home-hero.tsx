"use client"

import { motion, useReducedMotion } from "motion/react"
import { ProjectCardDeck } from "@/components/ui/project-card-deck"
import { featuredProjects } from "@/data/projects"

export function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col gap-8">
      <motion.section
        className="space-y-4 pt-10"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[360px] space-y-1 pt-4">
          <h1 className="text-2xl font-medium">
            Hi 👋 I'm Yannick,
          </h1>
          <p className="text-base font-normal tracking-tight">
            a Design Engineer and Creative based in Amsterdam. I work with
            one-of-a-kind brands and companies to take ideas from concept to
            reality, covering the design, the creative direction, and the
            build.
          </p>
        </div>
      </motion.section>

      <section className="pb-2">
        <ProjectCardDeck projects={featuredProjects.slice(0, 4)} />
      </section>
    </div>
  )
}
