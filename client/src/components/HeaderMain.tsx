import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import CartDrawer from "./CartDrawer";
import { BiUser } from "react-icons/bi";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth/auth";
import SearchInput from "./ui/SearchInput";

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

interface propsType {
    lng: string;
}

const HeaderMain: React.FC<propsType> = async ({ lng }) => {
    const data = await getData();
    const session: Session | null = await getServerSession(authOptions);

    return (
        <div className='border-b border-gray-200 py-6'>
            <div className='container sm:flex justify-between items-center'>
                <Link
                    href={"/"}
                    className='font-bold text-3xl text-center pb-4 sm:pb-0 text-blackish hover:text-accent cursor-pointer'
                >
                    {data.stores[0].name}
                </Link>
                <SearchInput lng={lng} />
                <div className='hidden lg:flex gap-4 text-gray-500 text-[30px]'>
                    {session?.user ? (
                        <Link href={"/profile"}>
                            <BiUser size={28} />
                        </Link>
                    ) : (
                        <Link href={"/login"}>
                            <BiUser size={28} />
                        </Link>
                    )}

                    <div className='relative'>
                        <FiHeart size={28} />
                        <div className='bg-accent rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[13px] text-white grid place-items-center translate-x-1 -translate-y-1'>
                            0
                        </div>
                    </div>
                    <CartDrawer lng={lng} />
                </div>
            </div>
        </div>
    );
};

export default HeaderMain;
