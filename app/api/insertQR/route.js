import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

let prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { INTERNO } = body;

        if (!INTERNO) {
            return new Response(
                JSON.stringify({ error: "Falta el campo INTERNO" }),
                { status: 400 }
            );
        }

        const nuevo = await prisma.asistenciaPensionados.create({
            data: {
                INTERNO,
                FECHA: new Date(),
            },
        });

        return new Response(JSON.stringify(nuevo), { status: 200 });
    } catch (err) {
        console.error("Error insertQR:", err);
        return new Response(
            JSON.stringify({
                error: "Error al insertar el registro",
                details: err.message,
            }),
            { status: 500 }
        );
    }
}

export async function GET() {
    return new Response("Ruta insertqr activa", { status: 200 });
}