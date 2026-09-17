import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"


const registerSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parsed = registerSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        const { name, email, password } = parsed.data

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json(
                { error: "Un compte existe déjà avec cet email" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        })

        return NextResponse.json(
            { id: user.id, email: user.email, name: user.name },
            { status: 201 }
        )
    } catch (error) {
        console.error("Register error:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}