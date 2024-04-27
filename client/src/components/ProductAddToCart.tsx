"use client";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useStore } from "@nanostores/react";
import { getProductRequest, productGetState } from "@/state/products";
import { addToCart, cart } from "@/state/cart";
import { HiCheckCircle } from "react-icons/hi";

import { toast } from "sonner";

import React from "react";
import { formatCurrency } from "./ProductCard";

type ProductDetailsProps = {
    id: string;
};

const ProductAddToCart: React.FC<ProductDetailsProps> = ({ id }) => {
    const product = useStore(productGetState);
    const [selectedVariant, setSelectedVariant] = useState<any>("");

    const cartItems = useStore(cart);

    const [qty, setQty] = useState<string | number>(1);

    const handleAddToCart = useCallback(
        async (quantity: string | number, selectedVariant: string) => {
            await addToCart(id, selectedVariant, Number(quantity));
            toast.success(
                <div className='font-bold text-base text-accent flex gap-4 items-center justify-center'>
                    <span>
                        <HiCheckCircle size={25} />
                    </span>
                    Added to cart
                </div>
            );
        },
        [id]
    );

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const product = await getProductRequest(id);
            // ...
            setSelectedVariant(product?.variants[0].id);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const cartItem = cartItems?.find((cartItem) => cartItem?.id === id);

        setQty(cartItem?.quantity || 1);
    }, [cartItems, id]);

    const variants = React.useMemo(() => {
        return product?.variants?.filter((variant) => {
            return variant.is_available === true;
        });
    }, [product?.variants]);

    const onChangeProductVariant = (e: ChangeEvent<HTMLSelectElement>) => {
        const newVariant = e.target.value;
        setSelectedVariant(newVariant);
    };
    console.log(selectedVariant);
    return (
        <div className='mt-8'>
            <h3 className='text-lg font-bold'>Sizes</h3>
            <div className='flex flex-wrap gap-4 mt-4'>
                <div className='relative bg-transparent w-full'>
                    <select
                        className='w-full appearance-none row-start-1 col-start-1 bg-slate-50 border focus:ring-2 ring-accent rounded-lg p-2 outline-none cursor-pointer'
                        onChange={(e) => onChangeProductVariant(e)}
                    >
                        {variants?.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                                {variant.title} {"  ("}
                                {formatCurrency(variant.price)})
                            </option>
                        ))}
                    </select>
                    <span className='absolute top-1/2 right-4 -translate-y-1/2'>
                        <svg
                            className='fill-current'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g opacity='0.8'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                                    fill=''
                                ></path>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <button
                onClick={() => handleAddToCart(qty, selectedVariant)}
                type='button'
                className='w-full mt-4 px-4 py-3 bg-accent hover:bg-blackish text-white font-bold rounded-lg'
            >
                Add to cart
            </button>
        </div>
    );
};

export default ProductAddToCart;
