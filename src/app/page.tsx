import Link from "next/link"
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6"
import { CalendarClock, Sparkles, BarChart3 } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <span className="font-display text-lg font-bold tracking-tight">
          PulseAI
        </span>
        <Link
          href="/login"
          className="rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-ink)" }}
        >
          Get started
        </Link>
      </nav>

      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-12 px-8 py-16 md:grid-cols-2 md:px-16 md:py-24">
        <div>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            Gardez le pouls de vos réseaux sociaux
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
            PulseAI planifie vos publications, génère du contenu avec l'IA et
            mesure vos performances sur Twitter, Instagram et LinkedIn — le
            tout depuis un seul tableau de bord.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-signal)" }}
          >
            Commencer gratuitement
          </Link>
        </div>

        {/* Pulse line graphic */}
        {/* Pulse line graphic */}
        <div className="relative h-48 w-full md:h-64">
          <svg viewBox="0 0 400 160" className="h-full w-full">
            <line x1="0" y1="80" x2="400" y2="80" stroke="var(--color-line)" strokeWidth="1" />
            <path
              d="M0 80 L120 80 L140 30 L160 130 L180 80 L400 80"
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx="60" cy="80" r="4" fill="var(--color-teal)" />
            <circle cx="220" cy="80" r="4" fill="var(--color-teal)" />
            <circle cx="330" cy="80" r="4" fill="var(--color-teal)" />
          </svg>

          {/* Icônes positionnées au-dessus des points */}
          <div className="absolute left-[10%] top-[18%] rounded-full bg-white p-2 shadow-sm">
            <FaXTwitter size={18} color="var(--color-ink)" />
          </div>
          <div className="absolute left-[52%] top-[-8%] rounded-full bg-white p-2 shadow-sm">
            <FaInstagram size={18} color="var(--color-ink)" />
          </div>
          <div className="absolute left-[80%] top-[18%] rounded-full bg-white p-2 shadow-sm">
            <FaLinkedinIn size={18} color="var(--color-ink)" />
          </div>
        </div>
      </section>

      {/* Services */}
      {/* Services */}
      <section className="px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:divide-x" style={{ borderColor: "var(--color-line)" }}>
          <div className="md:pr-10">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "var(--color-signal)" }}
            >
              <CalendarClock size={28} color="white" strokeWidth={1.75} />
            </div>
            <h3 className="font-display mt-6 text-xl">Planification</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Programmez vos publications sur toutes vos plateformes à
              l'avance, depuis un calendrier unique.
            </p>
          </div>

          <div className="md:px-10">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "var(--color-teal)" }}
            >
              <Sparkles size={28} color="white" strokeWidth={1.75} />
            </div>
            <h3 className="font-display mt-6 text-xl">Génération de contenu</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Laissez l'IA rédiger vos premiers brouillons de posts, que vous
              ajustez avant publication.
            </p>
          </div>

          <div className="md:pl-10">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "var(--color-ink)" }}
            >
              <BarChart3 size={28} color="white" strokeWidth={1.75} />
            </div>
            <h3 className="font-display mt-6 text-xl">Analyse des performances</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Suivez l'engagement de vos publications et identifiez ce qui
              fonctionne vraiment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}