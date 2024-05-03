import { Document, Schema } from "mongoose";

export interface EnrichedOrders {
    name: string;
    email: string;
    phone: string | null;
    address: AddressDocument;
    products: [EnrichedProducts];
    orderId: string;
    total_price: number;
    orderNumber: string;
    expectedDeliveryDate: Date;
    purchaseDate: string;
    _id: string;
}

export interface EnrichedProducts {
    name: string;
    category: string;
    image: [string];
    price: number;
    purchased: boolean;
    color: string;
    size: string;
    quantity: number;
    productId: Schema.Types.ObjectId;
    _id: Schema.Types.ObjectId;
    variantId: string;
}

export interface OrdersDocument extends Document {
    userId: string;
    orders: [OrderSubmissionProperties];
}

export interface OrderDocument {
    name: string;
    email: string;
    phone: number;
    address: AddressDocument;
    products: [ProductsDocument];
    orderId: string;
    purchaseDate: Date;
    expectedDeliveryDate: Date;
    total_price: number;
    orderNumber: string;
    _id: Schema.Types.ObjectId;
}

export interface AddressDocument {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface ProductsDocument {
    productId: Schema.Types.ObjectId;
    image: string;
    color: string;
    size: string;
    quantity: number;
    _id: string;
}

export interface FavoritesDocument extends Document {
    userId: string;
    favorites: [Schema.Types.ObjectId];
}

export interface ItemDocument {
    productId: Schema.Types.ObjectId;
    color: string;
    size: string;
    quantity: number;
    variantId: string;
    price: number;
}

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: [string];
    image: [string];
    variants: [VariantsDocument];
    quantity: number;
    productId: Schema.Types.ObjectId;
    purchased: boolean;
}

export interface VariantsDocument {
    priceId: string;
    color: string;
    images: [string];
}
export interface UserDocument {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: AddressDocument;
    image: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartItem {
    id: string;
    title: string;
    image: string;
    price: number;
    variant_id: number;
    variant_title: string;
    quantity: number;
    blueprint_id: number;
    print_provider_id: number;
    sku: string;
}

export type CalculateOrderShippingCostResponse = {
    standard: number;
    express: number;
    priority: number;
    printify_express: number;
    economy: number;
};

export type OrderSubmissionProperties = {
    external_id: string;
    label?: SVGStringList;
    line_items: (ProductIdLineItem | NewProductLineItem | SkuLineItem)[];
    shipping_method: ShippingMethod;
    send_shipping_notification?: boolean;
    address_to: {
        first_name: string;
        last_name: string;
        region: string;
        address1: string;
        address2?: string;
        city: string;
        zip: string;
        email: string;
        phone: string;
        country: string;
        company?: string;
    };
};

export interface ProductIdLineItem {
    product_id: string;
    variant_id: number;
    quantity: number;
}

export interface NewProductLineItem {
    print_provider_id: number;
    blueprint_id: number;
    variant_id: number;
    print_areas:
        | {
              front: string;
          }
        | {
              back: string;
          }
        | {
              front: string;
              back: string;
          };
    quantity: number;
}

export interface SkuLineItem {
    sku: string;
    quantity: number;
}

export enum ShippingMethod {
    /**
     * Standard Shippinh
     */
    standard = 1,
    /**
     * Priority Shipping
     */
    priority = 2,
    /**
     * Printify Express Shipping
     * @see https://developers.printify.com/#orders:~:text=or%20has%2Dissues.-,shipping%20method,-REQUIRED
     * @deprecated Not yet supported on public api. Should not be used for making orders.
     */
    express = 3,
}

export interface IReview {
    product_id: string;
    name: string;
    rating: number;
    comment: string;
    userId: Schema.Types.ObjectId;
}
