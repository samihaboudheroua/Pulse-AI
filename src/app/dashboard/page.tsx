"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { PostCard } from "@/components/PostCard"

type Post = {
    id: string
    content: string
    status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED"
    scheduledFor: string | null
    socialAccount: { provider: string }
}

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/posts")
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data)
                    setLoading(false)
                })
        }
    }, [status])

    async function handleDelete(id: string) {
        await fetch(`/api/posts/${id}`, { method: "DELETE" })
        setPosts((prev) => prev.filter((p) => p.id !== id))
    }

    if (status === "loading" || loading) {
        return <div className="p-8 text-sm text-gray-500">Chargement...</div>
    }

    return (
        <div className="p-8 md:p-16">
            <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl">
                    Bienvenue, {session?.user?.name}
                </h1>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Aucun post pour le moment. Créez votre premier post !
                    </p>
                ) : (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    )
}