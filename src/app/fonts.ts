import localFont from "next/font/local"

export const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
})

export const clashGrotesk = localFont({
  src: "./fonts/ClashGrotesk-Variable.woff2",
  variable: "--font-clash-grotesk",
  weight: "200 700",
  display: "swap",
})
