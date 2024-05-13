import { NextResponse } from "next/server";
import { GelatoClient } from "@/libs/gelato/client";

const client = new GelatoClient({
    token: process.env.GELATO_API_KEY!,
    version: "v1",
    base_url: "https://ecommerce.gelatoapis.com/",
});

export async function GET() {
    const { data: shops, error } = await client.getStores();

    if (!shops) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    const { data } = await client.getAllProducts(shops.stores[0].id);

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
