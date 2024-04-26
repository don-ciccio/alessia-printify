/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Drawer from "./Drawer";
import { useStore } from "@nanostores/react";
import { addToCart, cart } from "@/app/state/cart";
import { formatCurrency } from "./ProductCard";
import { HiOutlineShoppingBag } from "react-icons/hi";

const CartDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useStore(cart);

    return (
        <>
            <div
                className='relative cursor-pointer'
                onClick={() => setIsOpen(true)}
            >
                <HiOutlineShoppingBag size={28} />
                <div className='bg-accent rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[13px] text-white grid place-items-center translate-x-1 -translate-y-1'>
                    0
                </div>
            </div>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className='flex flex-col text-blackish'>
                    {cartItems?.map((item, id) => (
                        <div className='flex w-full px-5 mb-5' key={id}>
                            <div className='w-20'>
                                <img
                                    className='w-16 h-16 border rounded-md'
                                    src={item.image}
                                    alt={item.title}
                                />
                            </div>
                            <div className='flex flex-col relative w-2/3'>
                                <p className='text-[14px] font-semibold text-left'>
                                    {item.title}
                                </p>
                                <div>
                                    <span className='font-extralight text-sm'>
                                        ({item.variant_title}){" "}
                                    </span>
                                    <span className='font-extralight text-sm'>
                                        {formatCurrency(item.price)} X{" "}
                                        {item.quantity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>
        </>
    );
};

export default CartDrawer;
