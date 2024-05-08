/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface propsType {
    img: string;
    title: string;
    desc: string;
    tags: string[];
    price: number;
    id: string;
    lng: string;
}

export const formatCurrency = (amount = 0, currency = "EUR") =>
    new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency,
    }).format(amount / 100);

const ProductCard: React.FC<propsType> = ({
    img,
    title,
    tags,
    price,
    id,
    lng,
}) => {
    return (
        <Link href={`${lng}/products/${id}`}>
            <div className='border border-gray-200 rounded-xl max-w-[400px] min-h-[464px]'>
                <div>
                    <img
                        src={img}
                        alt={title}
                        className='h-[330px] w-full object-cover rounded-t-xl'
                    />
                </div>

                <div className='space-y-2 py-2 px-4'>
                    <span className='text-white px-2 py-1 mr-3 uppercase text-xs font-semibold bg-accent rounded-2xl'>
                        {tags[0]}
                    </span>
                    <h2 className='text-accent font-semibold'>{title}</h2>
                    <div className='font-bold text-lg flex gap-4 text-blackish'>
                        from{" "}
                        <span className='text-accent'>
                            {formatCurrency(price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
