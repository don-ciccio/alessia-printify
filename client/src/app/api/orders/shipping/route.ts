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

export async function POST(request: NextRequest) {
    const { line_items, address_to } = await request.json();
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
    const { data, error } = await client.calculateOrderShippingCost(
        shops[0]?.id,
        { line_items: line_items, address_to: address_to }
    );

    if (!data) {
        return NextResponse.json({ message: error, status: 400 });
    }

    return NextResponse.json(data);
}
