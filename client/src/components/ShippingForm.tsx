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
import { stripeCountries } from "@/libs/stripeCountryCodes";
import { useTranslation } from "@/app/i18n/client";

interface propsType {
    lng: string;
}

const ShippingForm: React.FC<propsType> = ({ lng }) => {
    const labelStyles = "block text-base mb-1";

    const { data: session } = useSession();
    const cartItems = useStore(cart);
    const { t } = useTranslation(lng, "checkout");

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
            startTransition(async () => {
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
                        lng: lng,
                    }
                );

                if (data.statusCode === 500) {
                    toast.error(data.message);
                    console.error(data.statusCode, data.message);
                    return;
                }

                window.location.href = data.session.url;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-6'>
                <h2 className='text-xl font-semibold text-gray-700 dark:text-white mb-4'>
                    {t("title")}
                </h2>
                <div className='flex flex-col gap-4 mb-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <label className={labelStyles}>
                                {t("firstName")}:
                            </label>

                            <input
                                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                                value={deliveryData.first_name}
                                onChange={handleInputChange}
                                name='first_name'
                                type='text'
                                required
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>
                                {t("lastName")}:
                            </label>
                            <input
                                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                                value={deliveryData.last_name}
                                onChange={handleInputChange}
                                name='last_name'
                                type='text'
                                required
                            />
                        </div>
                    </div>
                    <div className='grid  grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='relative bg-transparent w-full'>
                            <label className={labelStyles}>
                                {t("country")}:
                            </label>
                            <select
                                className='w-full appearance-none row-start-1 col-start-1 bg-slate-50 border focus:ring-1 ring-accent rounded-lg p-2 outline-none cursor-pointer'
                                name='country'
                                value={deliveryData.country}
                                onChange={handleInputChange}
                            >
                                {stripeCountries.map(({ country, code }) => (
                                    <option key={code} value={code}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <span className='absolute top-[54%] right-4'>
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
                        <div>
                            <label className={labelStyles}>
                                {t("address")}:
                            </label>

                            <input
                                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                                value={deliveryData.address1}
                                onChange={handleInputChange}
                                name='address1'
                                type='text'
                                required
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <label className={labelStyles}>{t("city")}:</label>

                            <input
                                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                                value={deliveryData.city}
                                onChange={handleInputChange}
                                name='city'
                                type='text'
                                required
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>{t("zip")}:</label>
                            <input
                                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                                value={deliveryData.zip}
                                onChange={handleInputChange}
                                name='zip'
                                type='text'
                                required
                            />
                        </div>
                    </div>
                </div>
                <h2 className='text-xl font-semibold text-gray-700 dark:text-white mb-4'>
                    {t("customer")}
                </h2>
                <div className='flex flex-col gap-4 mb-5'>
                    <div className='grid  grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='Email' className={labelStyles}>
                                Email
                            </label>
                            <input
                                id='email'
                                defaultValue={session?.user.email}
                                disabled={session?.user.image ? true : false}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                                className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                            />
                        </div>
                        <div>
                            <label htmlFor='Phone' className={labelStyles}>
                                {t("phone")}
                            </label>
                            <input
                                id='phone'
                                defaultValue={session?.user.phone}
                                disabled={session?.user.image ? true : false}
                                onChange={(e) =>
                                    setUser({ ...user, phone: e.target.value })
                                }
                                className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none appearance-none focus:ring-1 ring-accent'
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-8 flex justify-end'>
                    <button
                        type='submit'
                        className='min-w-[120px] text-base py-2.5 px-4 h-full transition-all hover:bg-blackish bg-accent rounded-lg text-white'
                    >
                        {isPending ? (
                            <Loader height={20} width={20} />
                        ) : (
                            t("place")
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ShippingForm;
