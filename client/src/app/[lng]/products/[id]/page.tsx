/* eslint-disable @next/next/no-img-element */
import { AddReview } from "@/components/AddReview";
import ProductAddToCart from "@/components/ProductAddToCart";
import { formatCurrency } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { Message } from "@/components/ui/Message";
import { Rating } from "@/components/ui/Rating";
import { RatingMain } from "@/components/ui/RatingMain";
import { Product } from "@/libs/printify/client";
import { IReview } from "@/types/types";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import { useTranslation } from "@/app/i18n";

async function getData(id: string): Promise<Product> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
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
            cache: "no-store",
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

const ProductDetails = async ({
    params,
}: {
    params: { id: string; lng: string };
}) => {
    const data = await getData(params.id);
    const { reviews } = await getReviews(params.id);
    const session: Session | null = await getServerSession(authOptions);
    const { t } = await useTranslation(params.lng, "product");
    const rating: number =
        reviews.reduce((acc: any, item: IReview) => item.rating + acc, 0) /
        reviews.length;
    const minPrice = data.variants?.reduce((prev, curr) =>
        prev.price < curr.price ? prev : curr
    );
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
                                {t("from")} {""}{" "}
                                {formatCurrency(minPrice?.price)}
                            </p>
                        </div>
                        <div className='flex space-x-2 mt-4'>
                            <RatingMain value={rating} text={""} />
                        </div>
                        <ProductAddToCart id={data.id} lng={params.lng} />
                        <div className='mt-8'>
                            <h3 className='text-lg font-bold'>
                                {" "}
                                {t("description")}
                            </h3>
                            <div className='space-y-3 mt-4 text-base'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.description,
                                    }}
                                />
                            </div>
                        </div>
                        {session && <AddReview id={data.id} lng={params.lng} />}
                        <div className='mt-8 max-w-md'>
                            <div className='text-xl md:text-2xl  pt-4 pb-3'>
                                <span className='font-bold text-lg'>
                                    {t("reviews")} (
                                    {reviews.length > 0 ? reviews.length : "0"})
                                </span>
                            </div>
                            {reviews?.length === 0 && (
                                <Message variant='info'>
                                    {t("no-reviews")}
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
