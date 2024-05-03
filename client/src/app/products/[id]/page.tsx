/* eslint-disable @next/next/no-img-element */
import { AddReview } from "@/components/AddReview";
import ProductAddToCart from "@/components/ProductAddToCart";
import { formatCurrency } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { Message } from "@/components/ui/Message";
import { Rating } from "@/components/ui/Rating";
import { Product } from "@/libs/printify/client";
import { IReview } from "@/types/types";

async function getData(id: string): Promise<Product> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getReviews(id: string): Promise<any> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}/reviews`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
    const data = await getData(params.id);
    const { reviews } = await getReviews(params.id);
    const rating: number =
        reviews.reduce((acc: any, item: IReview) => item.rating + acc, 0) /
        reviews.length;
    return (
        <div className='mx-auto'>
            <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-2xl mx-auto'>
                <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-8'>
                    <ProductCarousel images={data.images} title={data.title} />
                    <div>
                        <h2 className='text-2xl font-extrabold text-accent'>
                            {data.title}
                        </h2>
                        <div className='flex flex-wrap gap-4 mt-4'>
                            <p className='text-2xl font-bold'>
                                {formatCurrency(data.variants[0].price)}
                            </p>
                        </div>
                        <div className='flex space-x-2 mt-4'>
                            <svg
                                className='w-5 fill-accent'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-accent'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-accent'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-accent'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-[#CED5D8]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                        </div>
                        <ProductAddToCart id={data.id} />
                        <div className='mt-8'>
                            <h3 className='text-lg font-bold'>Description</h3>
                            <div className='space-y-3 mt-4 text-sm'>
                                {data.description}
                            </div>
                        </div>
                        <AddReview id={data.id} />
                        <div className='mt-8 max-w-md'>
                            <div className='text-xl md:text-2xl  pt-4 pb-3'>
                                <Rating
                                    value={rating}
                                    text={`${
                                        reviews.length > 0
                                            ? reviews.length
                                            : "0"
                                    } reviews`}
                                />
                            </div>
                            {reviews?.length === 0 && (
                                <Message variant='info'>
                                    There are no Reviews yet
                                </Message>
                            )}

                            {reviews?.map((review: IReview, key: string) => {
                                return (
                                    <div
                                        key={key}
                                        className='bg-[#faf2f3] border border-[#f7c6cc] text-blackish p-2 mb-4 rounded-lg'
                                    >
                                        <div className='mb-3'>
                                            <span className='text-sm'>
                                                {review?.name}
                                            </span>
                                            <span>
                                                <Rating
                                                    text={""}
                                                    value={review?.rating}
                                                />
                                            </span>
                                        </div>
                                        <p>{review?.comment}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
