"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useRouter } from "next/navigation"
import { ProjectCard } from "@/components/ui/project-card"
import type { Project } from "@/data/projects"

const CARD_WIDTH = 280
const CARD_HEIGHT = 400

const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 2 },
  { x: -8, y: 6, rotate: -3 },
  { x: 8, y: 12, rotate: -5 },
  { x: -12, y: 18, rotate: 4 },
  { x: 12, y: 24, rotate: -6 },
]

const FAN_ROTATIONS = [9, -11, -22, 18, -28]

function getStackOffset(index: number) {
  return (
    STACK_OFFSETS[index] ?? {
      x: (index % 2 === 0 ? 1 : -1) * (8 + index * 2),
      y: index * 6,
      rotate: (index % 2 === 0 ? 1 : -1) * (2 + index),
    }
  )
}

function getFanRotation(index: number) {
  return FAN_ROTATIONS[index] ?? (index % 2 === 0 ? 9 + index * 3 : -11 - index * 3)
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 26,
}

const entranceSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.9,
}

type ProjectCardDeckProps = {
  projects: Project[]
}

export function ProjectCardDeck({ projects }: ProjectCardDeckProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setHasAnimatedIn(true)
      return
    }

    const entranceDuration =
      420 + (projects.length - 1) * 90 + 600

    const timer = window.setTimeout(() => {
      setHasAnimatedIn(true)
    }, entranceDuration)

    return () => window.clearTimeout(timer)
  }, [reduceMotion, projects.length])

  const goToProjects = () => router.push("/projects")

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      goToProjects()
    }
  }

  const showFan = isHovered && !reduceMotion

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="View all projects"
      onClick={goToProjects}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative mx-auto h-[520px] w-full max-w-[320px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {projects.map((project, index) => {
        const stack = getStackOffset(index)
        const centerX = -CARD_WIDTH / 2 + stack.x
        const centerY = -CARD_HEIGHT / 2 + stack.y
        const fanRotation = getFanRotation(index)

        return (
          <motion.div
            key={project.id}
            className="absolute left-1/2 top-1/2"
            style={{
              zIndex: projects.length * 10 - index * 10,
              originX: 0.5,
              originY: 0.78,
            }}
            initial={
              reduceMotion
                ? false
                : {
                    x: centerX,
                    y: centerY + 150,
                    opacity: 0,
                    scale: 0.92,
                    rotate: stack.rotate,
                  }
            }
            animate={{
              x: centerX,
              y: centerY,
              opacity: 1,
              scale: 1,
              rotate: showFan ? fanRotation : stack.rotate,
            }}
            transition={
              !hasAnimatedIn && !reduceMotion
                ? { ...entranceSpring, delay: 0.42 + index * 0.09 }
                : springTransition
            }
          >
            <ProjectCard project={project} />
          </motion.div>
        )
      })}

      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: showFan ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-grey-600 text-sm text-grey-100"
      >
        →
      </motion.span>
    </div>
  )
}
