import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "../../../../../auth"
import { z } from "zod"

const updatePostSchema = z.object({
    content: z.string().min(1).optional(),
    mediaUrl: z.string().url().optional().nullable(),
    scheduledFor: z.string().datetime().optional().nullable(),
})

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const parsed = updatePostSchema.safeParse(body)

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0].message },
            { status: 400 }
        )
    }

    // Vérifie que le post appartient bien à l'utilisateur connecté
    const existingPost = await prisma.post.findUnique({ where: { id } })
    if (!existingPost || existingPost.userId !== session.user.id) {
        return NextResponse.json({ error: "Post introuvable" }, { status: 404 })
    }

    const updated = await prisma.post.update({
        where: { id },
        data: parsed.data,
    })

    return NextResponse.json(updated)
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { id } = await params

    const existingPost = await prisma.post.findUnique({ where: { id } })
    if (!existingPost || existingPost.userId !== session.user.id) {
        return NextResponse.json({ error: "Post introuvable" }, { status: 404 })
    }

    await prisma.post.delete({ where: { id } })

    return NextResponse.json({ success: true })
}