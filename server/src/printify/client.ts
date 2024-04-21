import { BASE_URL, VERSION } from "./constants";
import { PrintifyError } from "./errors";

export interface PrintifyClientOptions {
    token: string;
    version: VERSION;
    debug?: boolean;
}

export type ProductOptionBase = {
    name: string;
};

export type ColorOption = ProductOptionBase & {
    type: "color";
    values: {
        id: number;
        title: string;
        colors: string[];
    }[];
};

export type BasicOption = ProductOptionBase & {
    type: string;
    values: {
        id: number;
        title: string;
    }[];
};

export type ProductOption = ColorOption | BasicOption;

export interface ProductVariant {
    id: number;
    sku?: string;
    price: number;
    cost?: number;
    title?: string;
    grams?: number;
    is_enabled?: boolean;
    is_default?: boolean;
    is_available?: boolean;
    is_printify_express_eligible?: boolean;
    options?: number[];
    /**
     * This is not documented on the Printify's official documentation but was found to part of the responses.
     */
    quantity?: number;
}

type Product = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: ProductOption[];
    variants: ProductVariant[];
    images: {
        src: string;
        variant_ids: number[];
        position: string;
        is_default: boolean;
    }[];
    created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    is_printify_express_eligible: boolean;
    is_printify_express_enabled: boolean;
    is_economy_shipping_eligible: boolean;
    is_economy_shipping_enabled: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: {
        variant_ids: number[];
        placeholders: {
            position: string;
            images: {
                id: string;
                name: string;
                type: string;
                height: number;
                width: number;
                x: number;
                y: number;
                scale: number;
                angle: number;
            }[];
        }[];
        /**
         * Background HEX color
         */
        background: string;
    }[];
    sales_channel_properties: unknown[];
};

export type PaginatedResponse<TData> = {
    current_page: number;
    data: TData[];
    first_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
    last_page_url: string;
    last_page: number;
    total: number;
    per_page: number;
    from: number | null;
    to: number | null;
};

export type GetAllProductsResponse = PaginatedResponse<Product>;

export type GetShopsResponse = {
    id: number;
    title: string;
    sales_channel: string;
}[];

class PrintifyClient {
    /**
     * Printify API Token
     */
    private token: string;
    /**
     * Printify API URL
     */
    private API_URL: string;

    constructor(options: PrintifyClientOptions) {
        const { token, version } = options;
        this.token = token;
        this.API_URL = `${BASE_URL}${version}`;
    }

    async callApi<TResponse>(options: {
        method: "GET" | "POST" | "DELETE" | "PUT";
        path: string;
        headers?: HeadersInit;
        body?: Record<string, unknown>;
        searchParams?: Record<string, string>;
    }) {
        const url = `${this.API_URL}${options.path}${
            options.searchParams
                ? "?" + new URLSearchParams(options.searchParams).toString()
                : ""
        }`;
        const response = await fetch(url, {
            method: options.method,
            headers: {
                "User-Agent": "Printify NodeJS Client",

                Authorization: `Bearer ${this.token}`,
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        let data: TResponse | null = null;
        let error: PrintifyError | null = null;
        if (!response.ok) {
            error = await PrintifyError.fromResponse(response);
        } else {
            data = (await response.json()) as unknown as TResponse;
        }

        return { data, error };
    }

    async getShops() {
        const data = await this.callApi<GetShopsResponse>({
            method: "GET",
            path: "/shops.json",
        });
        return data;
    }

    async getAllProducts(
        shopId: number,
        pagination: {
            limit: number;
            page: number;
        } = { limit: 6, page: 1 }
    ) {
        const data = await this.callApi<GetAllProductsResponse>({
            method: "GET",
            path: `/shops/${shopId}/products.json`,
            searchParams: {
                limit: pagination.limit.toString(),
                page: pagination.page.toString(),
            },
        });
        return data;
    }
}

export { PrintifyClient };
