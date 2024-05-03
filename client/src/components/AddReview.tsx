"use client";
import { useStore } from "@nanostores/react";
import React, { useCallback, useState } from "react";
import {
    errorReviewProduct,
    getProductRequest,
    loadingReviewProduct,
    reviewProductRequest,
} from "@/state/products";
import { Message } from "@/components/ui/Message";
import Select from "@/components/ui/Select";

type AddReviewProps = {
    id: string;
};

export const AddReview: React.FC<AddReviewProps> = ({ id }) => {
    const error = useStore(errorReviewProduct);
    const loading = useStore(loadingReviewProduct);

    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    const handleAddReview = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!comment || !rating) {
                return;
            }
            reviewProductRequest(id, rating, comment).then(() => {
                getProductRequest(id);
                setComment("");
                setRating("");
            });
        },
        [id, rating, comment]
    );
    return (
        <div className='w-full'>
            <h2 className='text-lg font-bold   pt-6 pb-2 mx-auto'>
                Add Review
            </h2>

            <div>
                <form onSubmit={handleAddReview}>
                    {error && <Message variant='danger'>{error}</Message>}

                    <div className='flex flex-col'>
                        <label
                            className='block text-base mb-1'
                            htmlFor='rating'
                        >
                            Rating
                        </label>
                        <Select
                            length={5}
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            name='rating'
                        />
                    </div>
                    <br />
                    <div>
                        <label
                            className='block text-base mb-1'
                            htmlFor='comment'
                        >
                            Comment
                        </label>
                        <textarea
                            name='comment'
                            id='comment'
                            className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            required
                        ></textarea>
                        <br />
                        <button
                            className='mt-4 px-4 py-3 bg-accent hover:bg-blackish text-white font-bold rounded-lg'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};