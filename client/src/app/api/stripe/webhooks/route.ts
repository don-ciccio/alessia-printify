import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { OrdersDocument, OrderSubmissionProperties } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/libs/mongodb";
import { Orders } from "@/models/Orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
    try {
        await connectDB();
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        // Successfully constructed event.
        console.log("✅ Success:", event.id);

        // getting to the data we want from the event
        const payment = event.data.object as Stripe.PaymentIntent;
        const paymentId = payment.id;

        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSessionComplete = event.data.object;

                if (checkoutSessionComplete) {
                    const session_id = checkoutSessionComplete.id;

                    // Retrieve all line items from the session
                    const line_items =
                        await stripe.checkout.sessions.listLineItems(
                            session_id,
                            {
                                expand: ["data.price.product"],
                            }
                        );

                    const lineItemsData = line_items.data.map((item) => ({
                        price_id: item.price?.id,
                        quantity: item.quantity!,
                    }));

                    // Create an order document for each product
                    const orderDocument: OrderSubmissionProperties = {
                        external_id: uuidv4(),
                        shipping_method: 1,
                        send_shipping_notification: true,
                        line_items: [],
                        address_to: {
                            first_name:
                                checkoutSessionComplete.metadata?.name.split(
                                    " "
                                )[0] || "",
                            last_name:
                                checkoutSessionComplete.metadata?.name.split(
                                    " "
                                )[1] || "",
                            email:
                                checkoutSessionComplete.customer_details
                                    ?.email || "",
                            phone:
                                checkoutSessionComplete.customer_details
                                    ?.phone || "",
                            country:
                                checkoutSessionComplete.metadata?.country || "",
                            region:
                                checkoutSessionComplete.metadata?.state || "",
                            address1:
                                checkoutSessionComplete.metadata?.line1 || "",
                            address2: checkoutSessionComplete.metadata?.line2,
                            city: checkoutSessionComplete.metadata?.city || "",
                            zip:
                                checkoutSessionComplete.metadata?.postal_code ||
                                "",
                        },
                    };

                    // Append line items for each product
                    line_items.data.forEach(({ price }: any, index) => {
                        for (
                            let i = 0;
                            i < lineItemsData[index].quantity;
                            i++
                        ) {
                            orderDocument.line_items.push({
                                product_id: price?.product.metadata.product_id,
                                variant_id: Number(
                                    price?.product.metadata.variant_id
                                ),
                                quantity: Number(
                                    price?.product.metadata.quantity
                                ),
                            });
                        }
                    });

                    const userOrders: OrdersDocument | null =
                        await Orders.findOne({
                            userId: checkoutSessionComplete.metadata?.sessionId,
                        });

                    if (userOrders) {
                        userOrders.orders.push(orderDocument);
                        await Orders.findOneAndUpdate(
                            {
                                userId: checkoutSessionComplete.metadata
                                    ?.sessionId,
                            },
                            userOrders,
                            { new: true }
                        );
                    } else {
                        await Orders.collection.insertOne({
                            userId: checkoutSessionComplete.metadata?.sessionId,
                            orders: [orderDocument],
                        });
                    }
                }

                break;
            case "payment_intent.succeeded":
                console.log("Successful purchase", paymentId);
                break;

            case "charge.succeeded":
                const charge = event.data.object as Stripe.Charge;
                console.log(`💵 Charge id: ${charge.id}`);
                break;

            case "payment_intent.canceled":
                console.log("The purchase has not been completed");
                break;

            default:
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
        }

        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({ received: true });
    } catch (error) {
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }
};

export { webhookHandler as POST };
