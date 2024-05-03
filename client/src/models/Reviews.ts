import { IReview } from "@/types/types";
import { Schema, model, models } from "mongoose";

const reviewsSchema = new Schema<IReview>(
    {
        product_id: { type: String, required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Review = models.Reviews || model("Reviews", reviewsSchema);

export default Review;
