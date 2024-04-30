"use client";
import { ICartItem } from "@/types/types";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

import React, { useTransition, useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useStore } from "@nanostores/react";
import { UserDocument } from "@/types/types";

import { useSession } from "next-auth/react";
import { cart } from "@/state/cart";

const ShippingForm = () => {
    const labelStyles = "w-full text-sm";

    const { data: session } = useSession();
    const cartItems = useStore(cart);

    const [user, setUser] = useState<UserDocument>({} as UserDocument);
    const [isOpen, setIsOpen] = useState(false);
    let [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [deliveryData, setDeliveryData] = useState({
        first_name: "",
        last_name: "",
        country: "US",
        address1: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user as UserDocument);
        }
    }, [session]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDeliveryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (session === null) {
            toast.error("User information not found");
            return;
        }
        event.preventDefault();
        try {
            const formattedData = {
                line_items: cartItems?.map((cartItem: ICartItem) => ({
                    product_id: cartItem.id,
                    quantity: cartItem.quantity,
                    variant_id: cartItem.variant_id,
                    print_provider_id: cartItem.print_provider_id,
                    blueprint_id: cartItem.blueprint_id,
                    sku: cartItem.sku,
                })),
                address_to: {
                    first_name: deliveryData.first_name,
                    last_name: deliveryData.last_name,
                    email: user.email,
                    phone: user.phone,
                    country: deliveryData.country,
                    region: "",
                    address1: deliveryData.address1,
                    address2: "",
                    city: deliveryData.city,
                    zip: deliveryData.zip,
                },
            };

            const { data: shippingCost } = await axios.post(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/shipping`,
                {
                    line_items: formattedData.line_items,
                    address_to: formattedData.address_to,
                }
            );

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/payment`,
                {
                    lineItems: cartItems,
                    userId: session.user._id,
                    deliveryData: deliveryData,
                    shippingCost: shippingCost,
                }
            );

            if (data.statusCode === 500) {
                toast.error(data.message);
                console.error(data.statusCode, data.message);
                return;
            }

            window.location.href = data.session.url;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className='p-6 xs:p-10	w-full max-w-[680px] flex flex-col justify-between items-center gap-2.5	
                border border-solid border-gray-200 rounded-lg'
            onSubmit={handleSubmit}
        >
            <label className={labelStyles}>First name:</label>

            <input
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                value={deliveryData.first_name}
                onChange={handleInputChange}
                name='first_name'
                type='text'
                required
            />

            <label className={labelStyles}>Last name:</label>

            <input
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                value={deliveryData.last_name}
                onChange={handleInputChange}
                name='last_name'
                type='text'
                required
            />

            <select
                name='country'
                value={deliveryData.country}
                onChange={handleInputChange}
            >
                <option value='US'>United States</option>
            </select>

            <label className={labelStyles}>Address:</label>

            <input
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                value={deliveryData.address1}
                onChange={handleInputChange}
                name='address1'
                type='text'
                required
            />
            <label className={labelStyles}>City:</label>

            <input
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                value={deliveryData.city}
                onChange={handleInputChange}
                name='city'
                type='text'
                required
            />
            <label className={labelStyles}>Zip code:</label>

            <input
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                value={deliveryData.zip}
                onChange={handleInputChange}
                name='zip'
                type='text'
                required
            />
            <label htmlFor='Email' className='text-right'>
                Email
            </label>
            <input
                id='email'
                defaultValue={session?.user.email}
                disabled={session?.user.image ? true : false}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
            />

            <label htmlFor='Phone' className='text-right'>
                Phone
            </label>
            <input
                id='phone'
                defaultValue={session?.user.phone}
                disabled={session?.user.image ? true : false}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none appearance-none focus:ring-1 ring-accent'
            />

            <button
                type='submit'
                className='w-full text-sm p-2.5 h-full transition-all hover:bg-blackish bg-accent rounded-lg text-white'
            >
                {isPending ? <Loader height={20} width={20} /> : "Continue"}
            </button>
        </form>
    );
};

export default ShippingForm;
