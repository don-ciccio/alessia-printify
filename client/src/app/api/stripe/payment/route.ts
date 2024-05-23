import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
    try {
        const { lineItems, userId, deliveryData, shippingCost, lng } =
            await request.json();

        if (!lineItems || !userId) throw Error("Missing data");

        const lineItemsList = [];

        for (let item of lineItems) {
            const price = await stripe.prices.create({
                currency: "eur",
                unit_amount: item.price,
                product_data: {
                    name: item.title,
                    metadata: {
                        variant_id: item.variant_id,
                        product_id: item.id,
                        quantity: item.quantity,
                    },
                },
            });
            const quantity = item.quantity;
            lineItemsList.push({
                price: price.id,
                quantity: quantity,
            });
        }
        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            phone_number_collection: {
                enabled: true,
            },
            billing_address_collection: "auto",

            line_items: lineItemsList,

            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: shippingCost.standard,
                            currency: "eur",
                        },

                        display_name: "Shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 10,
                            },
                        },
                    },
                },
            ],

            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${lng}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,

            // Passes the shipping data collected before stripe session to the web hook
            metadata: {
                line1: deliveryData.address1,
                line2: "",
                state: "",
                city: deliveryData.city,
                postal_code: deliveryData.zip,
                country: deliveryData.country,
                name: deliveryData.first_name + " " + deliveryData.last_name,
                phone: deliveryData.phone,
                email: deliveryData.email,
                sessionId: userId,
            },
        });

        return NextResponse.json({ session: session }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ statusCode: 500, message: error.message });
    }
}
