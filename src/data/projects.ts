export type CaseStudySectionId =
  | "challenge"
  | "strategy"
  | "application"
  | "outcome"

export type CaseStudyImage = {
  src?: string
  alt: string
  layout?: "full" | "grid-2"
  /** Tailwind gradient classes when no src is provided */
  placeholderClassName?: string
}

export type CaseStudySection = {
  id: CaseStudySectionId
  title: string
  description: string
  images?: CaseStudyImage[]
}

export type Project = {
  id: string
  companyName: string
  tagline?: string
  role: string
  image?: string
  description: string
  year: string
  tags: string[]
  category?: string
  sections?: CaseStudySection[]
  credits?: string
  websiteUrl?: string
  websiteLabel?: string
  comingSoon?: boolean
  cardLinkLabel?: string
  href?: string
  featured?: boolean
}

export const CASE_STUDY_SECTION_ORDER: CaseStudySectionId[] = [
  "challenge",
  "strategy",
  "application",
  "outcome",
]

export const DEFAULT_SECTION_TITLES: Record<CaseStudySectionId, string> = {
  challenge: "Challenge",
  strategy: "Strategy",
  application: "Application",
  outcome: "Outcome",
}

function getDefaultSectionImages(
  project: Project,
  sectionId: CaseStudySectionId
): CaseStudyImage[] {
  const { companyName } = project

  switch (sectionId) {
    case "challenge":
      return [
        {
          alt: `${companyName} project overview`,
          layout: "full",
          placeholderClassName:
            "bg-gradient-to-br from-orange-100 to-orange-400/40",
        },
      ]
    case "strategy":
      return [
        {
          alt: `${companyName} strategy workshop`,
          layout: "grid-2",
          placeholderClassName:
            "bg-gradient-to-br from-grey-200 to-orange-100",
        },
        {
          alt: `${companyName} user journey mapping`,
          layout: "grid-2",
          placeholderClassName:
            "bg-gradient-to-br from-orange-400/30 to-grey-300",
        },
      ]
    case "application":
      return [
        {
          alt: `${companyName} application screens`,
          layout: "full",
          placeholderClassName:
            "bg-gradient-to-br from-grey-100 via-orange-100 to-orange-400/20",
        },
      ]
    case "outcome":
      return [
        {
          alt: `${companyName} project outcome`,
          layout: "full",
          placeholderClassName:
            "bg-gradient-to-br from-orange-400/20 to-grey-200",
        },
      ]
  }
}

export function getProjectSections(project: Project): CaseStudySection[] {
  if (project.sections?.length) return project.sections

  const { companyName, description, role } = project

  const descriptions: Record<CaseStudySectionId, string> = {
    challenge: description,
    strategy: `We defined a clear direction for ${companyName}, aligning product goals with user needs and setting priorities for the ${role.toLowerCase()} work ahead.`,
    application: `The solution took shape across key ${companyName} touchpoints — from early concepts and prototypes through to polished, production-ready experiences.`,
    outcome: `The project delivered meaningful impact for ${companyName} and established patterns the team could build on for what came next.`,
  }

  return CASE_STUDY_SECTION_ORDER.map((id) => ({
    id,
    title: DEFAULT_SECTION_TITLES[id],
    description: descriptions[id],
    images: getDefaultSectionImages(project, id),
  }))
}

export function getProjectCredits(project: Project): string {
  if (project.credits) return project.credits

  return `Huge thanks to the ${project.companyName} team for the collaboration and trust throughout this project.`
}

export const projects: Project[] = [
  {
    id: "biyu",
    companyName: "BIYU",
    tagline: "Strategic design for a circular start-up",
    role: "Product Design",
    category: "Product Design",
    description:
      "BIYU lets you rent quality products instead of buying them. With a small design team, I helped pivot the company to a web-first approach, building the website and design system that nearly doubled conversion.",
    year: "2022",
    tags: ["Design Systems", "Web Design"],
    featured: true,
    sections: [
      {
        id: "challenge",
        title: "Challenge",
        description:
          "BIYU had just launched its app and monthly subscriptions, but the company was only a year old and almost nobody knew the brand yet. Without that recognition, people had little reason to download the app or pay for a subscription, and conversion sat at 1.8%. This was a make-or-break window to prove the subscription model could work, and to do that, BIYU needed to build trust with people before asking them to commit.",
        images: [
          {
            alt: "BIYU rental flow overview",
            layout: "full",
            placeholderClassName: "bg-gradient-to-br from-orange-100 to-orange-400/40",
          },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        description:
          "Instead of pushing people straight to the app, we shifted focus to the web, where we could introduce BIYU and earn trust before asking for a commitment. With a three-person design team, we built high-conversion home and landing pages tailored to different needs, from first-time visitors still researching to seasoned renters who just wanted to move fast. The same thinking carried through the rest of the journey: a smoother checkout, a clear onboarding for someone's first rental, and an app experience built for frequent renters who value real-time tracking and quick reordering.",
        images: [
          {
            alt: "BIYU strategy workshop",
            layout: "grid-2",
            placeholderClassName: "bg-gradient-to-br from-grey-200 to-orange-100",
          },
          {
            alt: "BIYU user journey mapping",
            layout: "grid-2",
            placeholderClassName: "bg-gradient-to-br from-orange-400/30 to-grey-300",
          },
        ],
      },
      {
        id: "application",
        title: "Application",
        description:
          "The work spanned three fronts. The biggest was the website, BIYU's new front door, built on a design system I helped shape so everything stayed consistent as the product grew. We also rebuilt the app for frequent renters, and shaped the brand itself, from social campaigns and ads to posters across the city of Amsterdam.",
        images: [
          {
            alt: "BIYU checkout screens",
            layout: "full",
            placeholderClassName: "bg-gradient-to-br from-grey-100 via-orange-100 to-orange-400/20",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        description:
          "Conversion nearly doubled, climbing from 1.8% to 3.2%. The web-first bet paid off: by introducing BIYU and earning trust before asking for a commitment, the subscription model finally had room to prove itself.",
        images: [
          {
            alt: "BIYU outcome metrics",
            layout: "full",
            placeholderClassName: "bg-gradient-to-br from-orange-400/20 to-grey-200",
          },
        ],
      },
    ],
    credits:
      "Huge thanks to the designers I worked alongside, Tycho Litjens and Morris van Bergem. I learned a lot from you both. And to BIYU, thank you for the trust.",
    websiteUrl: "https://biyu.world",
  },
  {
    id: "nowatch",
    companyName: "NOWATCH",
    tagline: "Designed to support, not distract",
    role: "App Design",
    category: "App Design",
    description:
      "NOWATCH is a screenless smartwatch built around stress. I designed three core app features that turned raw biometric data into something people could understand and act on.",
    year: "2023",
    tags: ["Data visualization", "App Design"],
    featured: true,
    sections: [
      {
        id: "challenge",
        title: "Challenge",
        description:
          "NOWATCH makes a screenless smartwatch, which means the app is the only place users can see and make sense of their data. NOWATCH's whole focus is stress as the root cause of health issues, but the app was still early, and users could see their biometric numbers with no way to connect them to the stress behind them. They had the data, but no way to understand it or act on it.",
        images: [
          {
            alt: "NOWATCH app data overview",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-100 to-orange-400/40",
          },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        description:
          "The fix was to give people ways to connect their data to real moments in their lives. I helped launch three core features, each built to turn raw bio-data into something people could understand and act on. Sessions let users log stressful moments as they happen, so the data has context. Check-ins ask how someone is feeling mentally and emotionally in those moments, pairing the body's signals with the person's own read. And Journeys, designed with the NOWATCH team, are two-week programs that turn all of that into healthier habits over time.",
        images: [
          {
            alt: "NOWATCH Sessions feature",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-grey-200 to-orange-100",
          },
          {
            alt: "NOWATCH Check-ins feature",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/30 to-grey-300",
          },
        ],
      },
      {
        id: "application",
        title: "Application",
        description:
          "I designed all three features end to end, from first concept through to the final interface, working within NOWATCH's existing design system.",
        images: [
          {
            alt: "NOWATCH Journeys feature screens",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-grey-100 via-orange-100 to-orange-400/20",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        description:
          "The three features turned the NOWATCH app from a raw biometric tracker into a tool people could actually use to understand their stress and restore some balance. The data finally meant something, because users could connect it to what was happening in their lives and do something about it.",
        images: [
          {
            alt: "NOWATCH app outcome",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/20 to-grey-200",
          },
        ],
      },
    ],
    credits: "Huge thanks to the NOWATCH team for the monthly hackathons. They taught me so much about designing, building, and shipping features in such a short span of time.",
    websiteUrl: "https://nowatch.com/",
  },
  {
    id: "22night",
    companyName: "22NIGHT",
    tagline: "Brand and digital touchpoints for an event platform and community",
    role: "Product Design",
    description:
      "22NIGHT is a Gen-Z nightlife platform across Europe. As part of a small team, I rebuilt the brand, website, and backend from scratch, helping grow the community from 1,000 to over 50,000 members.",
    year: "2023",
    tags: ["Platform Design", "Brand Design"],
    featured: true,
    sections: [
      {
        id: "challenge",
        title: "Challenge",
        description:
          "22NIGHT was getting ready to officially launch, but the foundation wasn't ready to carry it. The brand was underdeveloped, and the platform was still early, built on a WordPress backend that couldn't meet what the company needed. At that point it was a small community of around 1,000 members in Amsterdam and a handful of venue partners. Launching on a shaky foundation risked burning first impressions with both the community and the venues, and those are hard to win back.",
        images: [
          {
            alt: "22NIGHT platform before rebuild",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-100 to-orange-400/40",
          },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        description:
          "We made the call to rebuild the brand and the platform from scratch. As a four-person team, two founders, a designer, and a developer, we started with the foundations of the 22NIGHT brand, then built outward in two directions. For the community, I designed a new website that made it easy to discover events across Amsterdam and other European cities. For the partners, we built a custom CMS and backend so venues and organisers could list events and see real data on who was showing up. Over the following years we kept adding to it, from spin-to-win free tickets to liking and following events, artists, and organisers, to a housing platform for community members looking for roommates.",
        images: [
          {
            alt: "22NIGHT brand foundations",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-grey-200 to-orange-100",
          },
          {
            alt: "22NIGHT community website",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/30 to-grey-300",
          },
        ],
      },
      {
        id: "application",
        title: "Application",
        description:
          "I designed the 22NIGHT brand and its assets, the community website, and the custom backend that partners used to run their events. As the platform grew, I designed the features we layered on top, from spin-to-win ticket giveaways to following events and artists.",
        images: [
          {
            alt: "22NIGHT partner CMS and backend",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-grey-100 via-orange-100 to-orange-400/20",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        description:
          "The rebuild paid off. From around 1,000 members at the start, the community grew past 50,000 and is still growing today, adding over 2,000 new sign-ups a month. The platform now sees more than 12,500 monthly active users, has sold over 100,000 tickets, and has driven €350,000 in profit.",
        images: [
          {
            alt: "22NIGHT community growth",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/20 to-grey-200",
          },
        ],
      },
    ],
    credits:
      "Special thanks to the founders, Junior and Jurre, for trusting me with your brand and product. It has been such a blessing to help you realise your ideas and build something from scratch together.",
    websiteUrl: "https://22night.com/",
  },
  {
    id: "sway",
    companyName: "SWAY",
    tagline: "Surrender to the SWAY",
    role: "Creative Direction",
    category: "Brand Design",
    description:
      "SWAY is an Amsterdam house music brand, sister to the techno brand Frenzy. I helped shape its creative direction from a blank page into a real identity, now filling rooms across the city of Amsterdam.",
    year: "2026",
    tags: ["Brand Design", "Concepting"],
    featured: true,
    sections: [
      {
        id: "challenge",
        title: "Challenge",
        description:
          "SWAY started as little more than an idea. The founders of Frenzy, an Amsterdam techno brand and good friends of mine, wanted to build a sister brand for house music. But Frenzy was no small thing to live up to: eight years of work and a niche, opinionated community of around 15,000 followers with strong views on the scene. SWAY had to feel clearly part of that family while standing as its own brand, distinct enough that it wasn't just techno's little sibling. And it was starting from a blank page, with no name, identity, or concept yet.",
        images: [
          {
            alt: "SWAY brand concept starting point",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-100 to-orange-400/40",
          },
        ],
      },
      {
        id: "strategy",
        title: "Strategy",
        description:
          "I started with a brand-concept deck that explored where SWAY could go. It covered the brand philosophy and moodboard, the logo wordmark and icon, the visual territory, ideas for video and photography, even venue concepts and future collaborations. The throughline was finding a house identity that felt unmistakably part of the Frenzy family while standing clearly on its own. I pitched the deck, and from that point I have been actively helping them shape the creative direction of the brand.",
        images: [
          {
            alt: "SWAY brand concept deck",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-grey-200 to-orange-100",
          },
          {
            alt: "SWAY moodboard and visual territory",
            layout: "grid-2",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/30 to-grey-300",
          },
        ],
      },
      {
        id: "application",
        title: "Application",
        description:
          "I shape a lot of what SWAY looks and feels like day to day. That spans the brand foundations and visual identity through to motion artwork and animations, print production, and the social graphics and content that carry the brand online. The work keeps the look consistent as SWAY grows from a concept into a brand people recognise.",
        images: [
          {
            alt: "SWAY brand assets and social content",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-grey-100 via-orange-100 to-orange-400/20",
          },
        ],
      },
      {
        id: "outcome",
        title: "Outcome",
        description:
          "SWAY went from an idea to a brand with a real presence. Its first event filled Sissi's Amsterdam in May 2026, selling around 400 tickets to fill the room, and the Frenzy community embraced it. That was enough to lock in two more dates at the same venue this year, with the next one an intimate boat party in August, a collaboration with the Zomervloot. What started as a blank page is now a house brand with its own identity, its own crowd, and its own momentum.",
        images: [
          {
            alt: "SWAY first event at Sissi's Amsterdam",
            layout: "full",
            placeholderClassName:
              "bg-gradient-to-br from-orange-400/20 to-grey-200",
          },
        ],
      },
    ],
    credits:
      "A special thanks to the founders, Thomas Post, Yannick Hazewindus, Fabian Tanahoe and Isaj Dijkman, for trusting me with their brand. Working alongside such close friends has always been a dream of mine, and I cannot wait to see where SWAY goes from here.",
    websiteUrl: "https://www.instagram.com/sway.amsterdam/",
    websiteLabel: "Upcoming event",
  },
  {
    id: "dingo",
    companyName: "DINGO",
    role: "Game Design",
    description:
      "A learning game in the spirit of Duolingo, but instead of languages you learn to style with Tailwind CSS. Built for complete beginners and designers learning to code, designed and built by me.",
    year: "2026",
    tags: ["Game Design", "Engineering"],
    featured: true,
    comingSoon: true,
    cardLinkLabel: "Game coming soon",
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

export function getProjectHref(project: Project) {
  return project.href ?? `/projects/${project.id}`
}

export function getProjectMetadataLine(project: Project) {
  const category = project.category ?? project.tags[0]
  return `${category} · ${project.year}`
}
