"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { useTranslation } from "@/app/i18n/client";
import { Langar } from "next/font/google";

interface propsType {
    lng: string;
}

const SearchInput: React.FC<propsType> = ({ lng }) => {
    const { t } = useTranslation(lng);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleChange = (term: string) => {
        if (term) {
            router.replace(`/${lng}/search?q=${encodeURIComponent(term)}`);
        } else {
            router.replace(`/${lng}/search`);
        }
    };

    return (
        <div className='w-full sm:w-[300px] md:w-[50%] relative'>
            <input
                aria-label='Search'
                className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-1 ring-accent'
                type='search'
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                placeholder={t("search.placeholder")}
            />
            <BsSearch
                className='absolute top-0 right-0 mr-3 mt-3 text-gray-400'
                size={20}
            />
        </div>
    );
};

export default SearchInput;
