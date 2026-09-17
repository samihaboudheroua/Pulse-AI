"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })

        const data = await res.json()
        setLoading(false)

        if (!res.ok) {
            setError(data.error)
            return
        }

        router.push("/login")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow"
            >
                <h1 className="text-xl font-semibold">Créer un compte</h1>

                {error && (
                    <p className="rounded bg-red-50 p-2 text-sm text-red-600">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Nom"
                    required
                    className="w-full rounded border p-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded border p-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    required
                    className="w-full rounded border p-2"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Création..." : "S'inscrire"}
                </button>
            </form>
        </div>
    )
}