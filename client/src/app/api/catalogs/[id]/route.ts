import { NextRequest, NextResponse } from "next/server";
import { GelatoApi } from "gelato-api";

const gelato = new GelatoApi({ apiKey: process.env.GELATO_API_KEY! });

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const tshirtsProducts = await gelato.products.getProductsInCatalog(
            params.id
        );

        return NextResponse.json(tshirtsProducts);
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error?.message, status: 400 });
    }
}
