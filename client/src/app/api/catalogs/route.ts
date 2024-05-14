import { NextResponse } from "next/server";
import { GelatoApi } from "gelato-api";

const gelato = new GelatoApi({ apiKey: process.env.GELATO_API_KEY! });

export async function GET() {
    try {
        const allCatalogs = await gelato.products.getCatalogs();

        return NextResponse.json(allCatalogs);
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error?.message, status: 400 });
    }
}
