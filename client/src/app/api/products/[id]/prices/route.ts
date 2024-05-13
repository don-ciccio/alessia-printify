import { NextResponse } from "next/server";
import { GelatoClient } from "@/libs/gelato/client";

const client = new GelatoClient({
    token: process.env.GELATO_API_KEY!,
    version: "v3",
    base_url: "https://product.gelatoapis.com/",
});

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { data, error } = await client.getPrices(params.id);

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
