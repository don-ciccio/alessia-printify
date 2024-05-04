/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback } from "react";
import Drawer from "./Drawer";
import { useStore } from "@nanostores/react";
import { getTotalItems, cart, removeFromCart } from "@/state/cart";
import { formatCurrency } from "./ProductCard";
import { HiOutlineShoppingBag, HiX } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CartDrawer = () => {
    const { data: session } = useSession();

    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useStore(cart);
    const total = getTotalItems();

    const handleRemoveFromCart = useCallback(
        async (id: string, variant_id: number) => {
            await removeFromCart(id, variant_id);
        },
        []
    );

    if (session?.user) {
        return (
            <>
                <div
                    className='relative cursor-pointer'
                    onClick={() => setIsOpen(true)}
                >
                    <HiOutlineShoppingBag size={28} />
                    <div className='bg-accent rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[13px] text-white grid place-items-center translate-x-1 -translate-y-1'>
                        {total}
                    </div>
                </div>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className='flex flex-col text-blackish'>
                        {cartItems?.length ? (
                            cartItems.map((item, id) => (
                                <div className='flex w-full px-5 mb-5' key={id}>
                                    <div className='w-[85px]'>
                                        <img
                                            className='w-16 h-16 border rounded-md'
                                            src={item.image}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className='flex flex-col relative w-5/6'>
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
                                    <div className='flex relative w-1/6 items-center justify-center'>
                                        <button
                                            title='Remove'
                                            type='button'
                                            onClick={() =>
                                                handleRemoveFromCart(
                                                    item.id,
                                                    item.variant_id
                                                )
                                            }
                                        >
                                            <HiX size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-col w-full px-5 mb-5'>
                                <p className='mb-4 text-base'>
                                    Your cart is empty. Start adding products!
                                </p>
                            </div>
                        )}
                        {cartItems?.length ? (
                            <div className='absolute flex bottom-4 w-full items-center justify-center'>
                                <Link
                                    onClick={() => setIsOpen(false)}
                                    href={"/checkout"}
                                    className='w-2/3 text-center text-base p-2.5 h-full transition-all hover:bg-blackish bg-accent rounded-lg text-white'
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </Drawer>
            </>
        );
    } else {
        return (
            <>
                <div
                    className='relative cursor-pointer'
                    onClick={() => setIsOpen(true)}
                >
                    <HiOutlineShoppingBag size={28} />
                    <div className='bg-accent rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[13px] text-white grid place-items-center translate-x-1 -translate-y-1'>
                        {total}
                    </div>
                </div>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className='flex  text-blackish'>
                        <div className='flex flex-col w-full px-5 mb-5'>
                            <p className='mb-4 text-base'>
                                Not registered? You must be in order to save
                                your products in the shopping cart.
                            </p>
                            <Link
                                className='flex font-medium	 items-center bg-accent justify-center text-sm min-w-[160px] max-w-[160px] h-[40px] px-[10px] rounded-lg border border-solid border-accent text-white transition-all hover:bg-blackish hover:border-[#454545]'
                                href='/login'
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </Drawer>
            </>
        );
    }
};

export default CartDrawer;
