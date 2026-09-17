"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const res = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        })

        setLoading(false)

        if (res?.error) {
            setError("Email ou mot de passe incorrect")
            return
        }

        router.push("/dashboard")
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <Link href="/" className="font-display text-lg font-bold">
                    PulseAI
                </Link>

                <h1 className="mt-8 font-display text-2xl">Connexion</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Content de vous revoir.
                </p>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: "var(--color-line)" }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
                        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
                        <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" />
                        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
                    </svg>
                    Continuer avec Google
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ backgroundColor: "var(--color-line)" }} />
                    <span className="text-xs text-gray-400">ou</span>
                    <div className="h-px flex-1" style={{ backgroundColor: "var(--color-line)" }} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        style={{ borderColor: "var(--color-line)" }}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        required
                        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        style={{ borderColor: "var(--color-line)" }}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: "var(--color-ink)" }}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Pas encore de compte ?{" "}
                    <Link href="/register" className="font-medium underline">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    )
}