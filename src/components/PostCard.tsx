type Post = {
    id: string
    content: string
    status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED"
    scheduledFor: string | null
    socialAccount: { provider: string }
}

const statusLabels: Record<Post["status"], string> = {
    DRAFT: "Brouillon",
    SCHEDULED: "Planifié",
    PUBLISHED: "Publié",
    FAILED: "Échec",
}

const statusColors: Record<Post["status"], string> = {
    DRAFT: "#9CA3AF",
    SCHEDULED: "#0B3D3D",
    PUBLISHED: "#16A34A",
    FAILED: "#FF5A3C",
}

export function PostCard({ post, onDelete }: { post: Post; onDelete: (id: string) => void }) {
    return (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-line)" }}>
            <div className="flex items-center justify-between">
                <span
                    className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: statusColors[post.status] }}
                >
                    {statusLabels[post.status]}
                </span>
                <span className="text-xs text-gray-400">{post.socialAccount.provider}</span>
            </div>

            <p className="mt-3 text-sm">{post.content}</p>

            {post.scheduledFor && (
                <p className="mt-2 text-xs text-gray-500">
                    Prévu le {new Date(post.scheduledFor).toLocaleString("fr-FR")}
                </p>
            )}

            <button
                onClick={() => onDelete(post.id)}
                className="mt-3 text-xs text-red-500 hover:underline"
            >
                Supprimer
            </button>
        </div>
    )
}