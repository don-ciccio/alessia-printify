import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Review from "@/models/Reviews";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { OrdersDocument } from "@/types/types";
import { Orders } from "@/models/Orders";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const id = params.id;
        const { rating, comment } = await req.json();
        const session: Session | null = await getServerSession(authOptions);

        const userOrders: OrdersDocument | null = await Orders.findOne({
            userId: session?.user._id,
        });

        if (!userOrders) {
            NextResponse.json({ status: 400 });
            throw new Error("Order our products before reviewing them");
        }
        const review = new Review({
            product_id: id,
            name: session?.user.name,
            rating: Number(rating),
            comment,
            userId: session?.user._id,
        });

        const newReview = await review.save();
        return NextResponse.json(
            {
                message: "Review added successfully",
                newReview,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        } else {
            console.error("Error adding review", error);
            return NextResponse.error();
        }
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const session: Session | null = await getServerSession(authOptions);

        const id = params.id;

        const reviews = await Review.find({
            product_id: id,
        });

        const alreadyReviewed = reviews.find(
            (review) =>
                review.userId.toString() === session?.user._id.toString()
        );

        if (alreadyReviewed) {
            NextResponse.json({ status: 400 });
            throw new Error("Product already reviewed");
        }

        return NextResponse.json(
            {
                reviews,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        } else {
            console.error("Error adding review", error);
            return NextResponse.error();
        }
    }
}
