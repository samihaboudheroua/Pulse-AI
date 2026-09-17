import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "../../../../auth"
import { z } from "zod"

const createPostSchema = z.object({
    content: z.string().min(1, "Le contenu ne peut pas être vide"),
    mediaUrl: z.string().url().optional().nullable(),
    socialAccountId: z.string(),
    scheduledFor: z.string().datetime().optional().nullable(),
})

// Lister les posts de l'utilisateur connecté
export async function GET() {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const posts = await prisma.post.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: { socialAccount: true },
    })

    return NextResponse.json(posts)
}

// Créer un nouveau post
export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = createPostSchema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0].message },
            { status: 400 }
        )
    }

    const { content, mediaUrl, socialAccountId, scheduledFor } = parsed.data

    const post = await prisma.post.create({
        data: {
            content,
            mediaUrl,
            socialAccountId,
            userId: session.user.id,
            status: scheduledFor ? "SCHEDULED" : "DRAFT",
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        },
    })

    return NextResponse.json(post, { status: 201 })
}