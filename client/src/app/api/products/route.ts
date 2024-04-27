import { PrintifyClient } from "@/libs/printify/client";
import { NextResponse } from "next/server";

export type GetShopsResponse = {
    id: number;
    title: string;
    sales_channel: string;
}[];

const client = new PrintifyClient({
    token: process.env.PRINTIFY_TOKEN!,
    version: "v1",
});

export async function GET() {
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

    const { data, error } = await client.getAllProducts(shops[0]?.id, {
        page: 1,
        limit: 9,
    });

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }

    return NextResponse.json(data);
}
