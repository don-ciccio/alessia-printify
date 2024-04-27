import { PrintifyClient } from "@/libs/printify/client";
import { NextRequest, NextResponse } from "next/server";

export type GetShopsResponse = {
    id: number;
    title: string;
    sales_channel: string;
}[];

const client = new PrintifyClient({
    token: process.env.PRINTIFY_TOKEN!,
    version: "v1",
});

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { data: shops } = await client.callApi<GetShopsResponse>({
        method: "GET",
        path: "/shops.json",
    });

    if (!shops) {
        return NextResponse.json({
            message: "Shop not found",
            status: 404,
        });
    }

    const { data, error } = await client.getProductById(shops[0].id, params.id);

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
