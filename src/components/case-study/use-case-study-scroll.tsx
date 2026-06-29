"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { CaseStudySection, CaseStudySectionId } from "@/data/projects"

type CaseStudyScrollContextValue = {
  activeSectionId: CaseStudySectionId
  sectionProgress: number
  scrollToSection: (id: CaseStudySectionId) => void
}

const CaseStudyScrollContext =
  createContext<CaseStudyScrollContextValue | null>(null)

type CaseStudyScrollProviderProps = {
  sections: CaseStudySection[]
  children: ReactNode
}

const ACTIVE_SECTION_MARKER_RATIO = 0.3

function getActiveSectionFromScroll(
  sections: CaseStudySection[]
): CaseStudySectionId {
  const markerLine = window.innerHeight * ACTIVE_SECTION_MARKER_RATIO
  let activeId = sections[0]?.id ?? "challenge"

  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (!element) continue

    if (element.getBoundingClientRect().top <= markerLine) {
      activeId = section.id
    }
  }

  return activeId
}

function getSectionProgress(sectionId: CaseStudySectionId) {
  const element = document.getElementById(sectionId)
  if (!element) return 0

  const rect = element.getBoundingClientRect()
  const sectionTop = window.scrollY + rect.top
  const sectionHeight = element.offsetHeight
  const viewport = window.innerHeight
  const scrollable = sectionHeight - viewport

  if (scrollable <= 0) return 1

  const scrolled = window.scrollY - sectionTop
  return Math.min(1, Math.max(0, scrolled / scrollable))
}

export function CaseStudyScrollProvider({
  sections,
  children,
}: CaseStudyScrollProviderProps) {
  const [activeSectionId, setActiveSectionId] = useState<CaseStudySectionId>(
    sections[0]?.id ?? "challenge"
  )
  const [sectionProgress, setSectionProgress] = useState(0)
  const activeSectionRef = useRef(activeSectionId)
  const isScrollingToRef = useRef(false)
  const scrollTargetRef = useRef<CaseStudySectionId | null>(null)

  activeSectionRef.current = activeSectionId

  const scrollToSection = useCallback((id: CaseStudySectionId) => {
    isScrollingToRef.current = true
    scrollTargetRef.current = id
    setActiveSectionId(id)
    setSectionProgress(0)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

    window.setTimeout(() => {
      isScrollingToRef.current = false
      scrollTargetRef.current = null
    }, 800)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateScrollState = () => {
      const activeId = isScrollingToRef.current
        ? (scrollTargetRef.current ?? activeSectionRef.current)
        : getActiveSectionFromScroll(sections)

      if (!isScrollingToRef.current) {
        setActiveSectionId(activeId)
      }
      setSectionProgress(getSectionProgress(activeId))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [sections])

  useEffect(() => {
    setSectionProgress(getSectionProgress(activeSectionId))
  }, [activeSectionId])

  return (
    <CaseStudyScrollContext.Provider
      value={{ activeSectionId, sectionProgress, scrollToSection }}
    >
      {children}
    </CaseStudyScrollContext.Provider>
  )
}

export function useCaseStudyScroll() {
  const context = useContext(CaseStudyScrollContext)
  if (!context) {
    throw new Error(
      "useCaseStudyScroll must be used within CaseStudyScrollProvider"
    )
  }
  return context
}
