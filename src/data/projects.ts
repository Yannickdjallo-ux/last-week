export type Project = {
  id: string
  companyName: string
  role: string
  image?: string
  description: string
  year: string
  tags: string[]
  href?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "biyu",
    companyName: "BIYU",
    role: "Product Design",
    description:
      "I optimized the entire rental flow that led to a conversion boost from 1.8% to 3.2% and contributed to building the design system from scratch.",
    year: "2022",
    tags: ["Design Systems", "Web Design"],
    featured: true,
  },
  {
    id: "nowatch",
    companyName: "NOWATCH",
    role: "App Design",
    description:
      "I played a key role in launching three core app features, built to help people live more consciously through bio-data and guided feedback",
    year: "2023",
    tags: ["Data visualization", "E-commerce"],
    featured: true,
  },
  {
    id: "22night",
    companyName: "22NIGHT",
    role: "Product Design",
    description:
      "I directed brand and digital touchpoints for 22NIGHT, an event platform and community with over 50.000 members.",
    year: "2023",
    tags: ["Branding", "Platform Design"],
    featured: true,
  },
  {
    id: "cz",
    companyName: "CZ Zorg",
    role: "Digital Design",
    description:
      "I was responsible for optimizing the Salesfunnel of CZ Zorgverzekering by conducting user research and A/B testing.",
    year: "2024",
    tags: ["Web Design", "Design Systems"],
    featured: true,
  },
  {
    id: "sesh",
    companyName: "SESH",
    role: "Design Engineering",
    description:
      "Sesh is a community-first events and ticketing marketplace, with European expansion planned. The platform connects event organisers with members who discover, register, and attend events, a two-sided marketplace that sells tickets",
    year: "2026",
    tags: ["Platform Design", "Engineering"],
    featured: true,
  },
  {
    id: "sway",
    companyName: "SWAY",
    role: "Creative Direction",
    description:
      "I am responsible for the full creative direction of SWAY, an Amsterdam house music event brand, from initial concept through to launch.",
    year: "2026",
    tags: ["Branding", "Concepting"],
    featured: true,
  },
  {
    id: "dingo",
    companyName: "DINGO",
    role: "Game Design",
    description:
      "I am designing and building a web-app game that teaches users how to code with Tailwind CSS tokens",
    year: "2026",
    tags: ["Game Design", "Engineering"],
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

export function getProjectHref(project: Project) {
  return project.href ?? `/projects/${project.id}`
}
