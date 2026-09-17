import { Space_Grotesk, Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
