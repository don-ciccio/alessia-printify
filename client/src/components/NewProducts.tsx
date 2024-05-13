import { Product } from "@/libs/printify/client";
import React from "react";
import ProductCard from "./ProductCard";
import { useTranslation } from "@/app/i18n";

async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

interface propsType {
    lng: string;
}

const NewProducts: React.FC<propsType> = async ({ lng }) => {
    const data = await getData();

    const { t } = await useTranslation(lng);
    return (
        <div>
            <div className='container py-16'>
                <h2 className='font-medium text-2xl pb-4'>
                    {" "}
                    {t("new-products")}
                </h2>
                <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10'>
                    {data.products?.map((item: any) => {
                        const obj = item.metadata?.filter(
                            (item: { key: any }) =>
                                item.key === "primaryPreviewProductVariantKey"
                        );
                        return (
                            <ProductCard
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                img={item.previewUrl}
                                desc={item.description}
                                lng={lng}
                                price={obj[0].value}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewProducts;
