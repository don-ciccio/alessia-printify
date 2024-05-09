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
import { useRouter } from "next/navigation";
import RatingStar from "./RatingStar/RatingStar";
import { useTranslation } from "@/app/i18n/client";

type AddReviewProps = {
    id: string;
    lng: string;
};

export const AddReview: React.FC<AddReviewProps> = ({ id, lng }) => {
    const error = useStore(errorReviewProduct);
    const { t } = useTranslation(lng, "product");

    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const router = useRouter();

    const handleAddReview = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!comment || !rating) {
                return;
            }
            reviewProductRequest(id, rating.toString(), comment).then(() => {
                getProductRequest(id);
                setComment("");
                setRating(0);
            });
            router.push(`/guides/${id}`);
            router.refresh();
        },
        [comment, rating, id, router]
    );

    const onChange = (nextValue: number) => {
        setRating(nextValue);
    };
    return (
        <div className='w-full'>
            <h2 className='text-lg font-bold   pt-6 pb-2 mx-auto'>
                {t("add-review")}
            </h2>

            <div>
                <form onSubmit={handleAddReview}>
                    {error && <Message variant='danger'>{error}</Message>}

                    <div className='flex flex-col'>
                        <label
                            className='block text-base mb-1'
                            htmlFor='rating'
                        >
                            {t("rating")}
                        </label>
                        <RatingStar
                            onChange={onChange}
                            value={rating}
                            isEdit={true}
                            activeColors={[
                                "red",
                                "orange",
                                "#FFCE00",
                                "#9177FF",
                                "#8568FC",
                            ]}
                        />
                    </div>
                    <br />
                    <div>
                        <label
                            className='block text-base mb-1'
                            htmlFor='comment'
                        >
                            {t("comment")}
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
                            className='mt-4 px-4 py-2 bg-accent hover:bg-blackish text-white font-bold rounded-lg'
                            type='submit'
                        >
                            {t("submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
