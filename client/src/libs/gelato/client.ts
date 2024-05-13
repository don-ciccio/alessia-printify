import { GetStoresResponse } from "./types";

export interface GelatoClientOptions {
    token: string;
    base_url: string;
    version: string;
    debug?: boolean;
}

export type GetCatalogsResponse = {
    catalogUid: string;
    title: string;
}[];

export class GelatoError extends Error {
    response?: Response;
    status?: number;
    data?: unknown;

    constructor(message: string) {
        super(message);
        this.name = "GelatoError";
    }

    static async fromResponse(response: Response) {
        const error = new GelatoError(response.statusText);
        error.response = response;
        error.status = response.status;
        if (
            response.headers.get("content-type")?.includes("application/json")
        ) {
            error.data = await response.json();
        }
        return error;
    }
}

class GelatoClient {
    /**
     * Gelato API Token
     */
    private token: string;
    /**
     * Gelato API URL
     */
    private API_URL: string;

    constructor(options: GelatoClientOptions) {
        const { token, version, base_url } = options;
        this.token = token;
        this.API_URL = `${base_url}${version}`;
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
                "X-API-KEY": `${this.token}`,
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        let data: TResponse | null = null;
        let error: GelatoError | null = null;
        if (!response.ok) {
            error = await GelatoError.fromResponse(response);
        } else {
            data = (await response.json()) as unknown as TResponse;
        }

        return { data, error };
    }

    async getStores() {
        const data = await this.callApi<GetStoresResponse>({
            method: "GET",
            path: `/stores`,
        });
        return data;
    }

    async getAllProducts(
        storeId: string,
        pagination?: {
            order: string;
            orderBy: string;
            limit: number;
            offset: number;
        }
    ) {
        if (typeof pagination !== "undefined") {
            const data = await this.callApi<any>({
                method: "GET",
                path: `/stores/${storeId}/products`,
                searchParams: {
                    limit: pagination.limit.toString(),
                    order: pagination.order,
                    orderBy: pagination.orderBy,
                    offset: pagination.offset.toString(),
                },
            });
            return data;
        } else {
            const data = await this.callApi<any>({
                method: "GET",
                path: `/stores/${storeId}/products`,
            });
            return data;
        }
    }

    async getPrices(productUid: string) {
        const data = await this.callApi<any>({
            method: "GET",
            path: `/products/${productUid}/prices`,
        });
        return data;
    }

    async getProductById(shopId: string, productId: string) {
        const data = await this.callApi<any>({
            method: "GET",
            path: `/stores/${shopId}/products/${productId}`,
        });
        return data;
    }
}

export { GelatoClient };
