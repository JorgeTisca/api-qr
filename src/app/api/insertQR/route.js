import { PrismaClient } from "@prisma/client";

let prisma;
if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

export async function POST(req) {
    try {
        const body = await req.json();
        const { codigo } = body;

        if (!codigo) {
            return new Response(JSON.stringify({ error: "Falta el código QR" }), { status: 400 });
        }

        const nuevo = await prisma.codigoQR.create({
            data: { codigo },
        });

        return new Response(JSON.stringify(nuevo), { status: 200 });
    } catch (err) {
        console.error("Error insertQR:", err);
        return new Response(JSON.stringify({ error: "Error al insertar el QR", details: err.message }), { status: 500 });
    }
}