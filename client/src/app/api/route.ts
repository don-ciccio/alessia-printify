import { PrintifyClient } from "@/libs/printify/client";
import { PrintifyError } from "@/libs/printify/errors";
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
    const { data, error } = await client.callApi<
        GetShopsResponse | PrintifyError
    >({
        method: "GET",
        path: "/shops.json",
    });

    if (!data) {
        return NextResponse.json({ message: error?.message, status: 400 });
    }
    return NextResponse.json(data);
}
