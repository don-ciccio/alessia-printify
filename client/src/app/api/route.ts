import { NextResponse } from "next/server";
import { GelatoClient } from "@/libs/gelato/client";

const client = new GelatoClient({
    token: process.env.GELATO_API_KEY!,
    version: "v1",
    base_url: "https://ecommerce.gelatoapis.com/",
});

export async function GET() {
    const { data, error } = await client.getStores();

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
