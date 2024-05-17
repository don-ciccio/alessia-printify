import { PrintifyClient, Product } from "@/libs/printify/client";
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
    { params }: { params: { category: string } }
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

    const { data, error } = await client.getProducts(shops[0]?.id);
    if (data?.data) {
        let filter = data.data.filter((item: Product) =>
            item.tags.find((item) => item === params.category)
        );

        if (!filter) {
            return NextResponse.json({ message: error?.message, status: 400 });
        }

        return NextResponse.json(filter);
    }
}
