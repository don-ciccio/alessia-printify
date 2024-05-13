/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "@/app/i18n";
import Link from "next/link";
import React from "react";

interface propsType {
    img: string;
    title: string;
    desc: string;
    price: string;
    id: string;
    lng: string;
}

export const formatCurrency = (amount = 0, currency = "USD") =>
    new Intl.NumberFormat("us-US", {
        style: "currency",
        currency,
    }).format(amount);

async function getData(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}/prices`,
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

const ProductCard: React.FC<propsType> = async ({
    img,
    title,
    id,
    lng,
    price,
}) => {
    const { t } = await useTranslation(lng);
    const data = await getData(price);

    return (
        <Link href={`/${lng}/products/${id}`}>
            <div className='border border-gray-200 rounded-xl max-w-[400px] min-h-[464px]'>
                <div>
                    <img
                        src={img}
                        alt={title}
                        className='h-[330px] w-full object-cover rounded-t-xl'
                    />
                </div>

                <div className='space-y-2 py-2 px-4'>
                    <h2 className='text-accent font-semibold'>{title}</h2>
                    <div className='font-bold text-lg flex gap-4 text-blackish'>
                        {t("from")}{" "}
                        <span className='text-accent'>
                            {formatCurrency(data[0].price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
