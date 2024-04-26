import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import CartDrawer from "./CartDrawer";

async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const HeaderMain = async () => {
    const data = await getData();

    return (
        <div className='border-b border-gray-200 py-6'>
            <div className='container sm:flex justify-between items-center'>
                <Link
                    href={"/"}
                    className='font-bold text-3xl text-center pb-4 sm:pb-0 text-blackish hover:text-accent cursor-pointer'
                >
                    {data[0].title}
                </Link>
                <div className='w-full sm:w-[300px] md:w-[50%] relative'>
                    <input
                        className='border-gray-200 border p-2 px-4 rounded-lg w-full outline-none focus:ring-2 ring-accent'
                        type='text'
                        placeholder='Enter any product name...'
                    />
                    <BsSearch
                        className='absolute top-0 right-0 mr-3 mt-3 text-gray-400'
                        size={20}
                    />
                </div>
                <div className='hidden lg:flex gap-4 text-gray-500 text-[30px]'>
                    <div className='relative'>
                        <FiHeart size={28} />
                        <div className='bg-accent rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[13px] text-white grid place-items-center translate-x-1 -translate-y-1'>
                            0
                        </div>
                    </div>
                    <CartDrawer />
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;
