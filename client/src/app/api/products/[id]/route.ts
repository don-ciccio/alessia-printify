import { GelatoClient } from "@/libs/gelato/client";
import { NextRequest, NextResponse } from "next/server";

const ecommerceClient = new GelatoClient({
    token: process.env.GELATO_API_KEY!,
    version: "v1",
    base_url: "https://ecommerce.gelatoapis.com/",
});

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { data: shops, error } = await ecommerceClient.getStores();

    if (!shops) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    const { data } = await ecommerceClient.getProductById(
        shops.stores[0].id,
        params.id
    );

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
