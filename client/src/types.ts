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

export type Product = {
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
