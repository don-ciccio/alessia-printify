"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleChange = (term: string) => {
        if (term) {
            router.replace(`/search?q=${encodeURIComponent(term)}`);
        } else {
            router.replace("/search");
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
                placeholder='Enter any product name...'
            />
            <BsSearch
                className='absolute top-0 right-0 mr-3 mt-3 text-gray-400'
                size={20}
            />
        </div>
    );
};

export default SearchInput;
