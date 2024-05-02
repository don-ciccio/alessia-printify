import {
    OrderSubmissionProperties,
    OrdersDocument,
    ProductIdLineItem,
} from "@/types/types";
import { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema<ProductIdLineItem>({
    product_id: {
        type: String,
        required: false,
    },
    variant_id: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const OrderSchema = new Schema<OrderSubmissionProperties>({
    external_id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    line_items: {
        type: [ProductsSchema],
        required: true,
    },
    shipping_method: {
        type: Number,
        required: true,
    },
    send_shipping_notification: {
        type: Boolean,
        required: true,
    },
    address_to: {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: false,
        },
    },
});

const OrdersSchema = new Schema<OrdersDocument>({
    userId: {
        type: String,
        required: true,
    },
    orders: {
        type: [OrderSchema],
        default: [],
    },
});

export const Orders = models.Orders || model("Orders", OrdersSchema);
