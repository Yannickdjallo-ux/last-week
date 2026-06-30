import Image from "next/image"
import type { CaseStudyImage } from "@/data/projects"
import { cn } from "@/lib/utils"

type CaseStudyImageBlockProps = {
  image: CaseStudyImage
  className?: string
}

export function CaseStudyImageBlock({
  image,
  className,
}: CaseStudyImageBlockProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        image.aspectClassName ?? "aspect-[16/10]",
        image.placeholderClassName ?? "bg-grey-200",
        className
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-end p-6">
          <span className="text-xs text-grey-400">{image.alt}</span>
        </div>
      )}
    </div>
  )
}

type CaseStudyImageGridProps = {
  images: CaseStudyImage[]
}

export function CaseStudyImageGrid({ images }: CaseStudyImageGridProps) {
  const gridImages = images.filter((image) => image.layout === "grid-2")
  const fullImages = images.filter(
    (image) => image.layout !== "grid-2"
  )

  return (
    <div className="space-y-4">
      {fullImages.map((image) => (
        <CaseStudyImageBlock key={image.alt} image={image} />
      ))}
      {gridImages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {gridImages.map((image) => (
            <CaseStudyImageBlock
              key={image.alt}
              image={image}
              className="aspect-square"
            />
          ))}
        </div>
      )}
    </div>
  )
}
