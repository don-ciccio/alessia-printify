"use client";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { languages, fallbackLng } from "@/app/i18n/settings";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface propsType {
    lng: string;
}
const HeaderTop: React.FC<propsType> = ({ lng }) => {
    return (
        <div className='border-b border-gray-200 hidden sm:block'>
            <div className='container py-4'>
                <div className='flex justify-between items-center'>
                    <div className='hidden lg:flex gap-1'>
                        <div className='header_top__icon_wrapper'>
                            <BsFacebook />
                        </div>
                        <div className='header_top__icon_wrapper'>
                            <BsTwitter />
                        </div>
                        <div className='header_top__icon_wrapper'>
                            <BsInstagram />
                        </div>
                    </div>
                    <div className='text-gray-500 text-[13px]'>
                        <b>FREE SHIPPING</b> THIS WEEK ORDER OVER - $55
                    </div>
                    <div className='flex gap-4'>
                        {languages
                            .filter((l) => lng !== l)
                            .map((l, index) => {
                                return (
                                    <span
                                        className='text-gray-500 text-[14px]'
                                        key={l}
                                    >
                                        {index > 0 && " or "}
                                        <Link href={`/${l}`}>{l}</Link>
                                    </span>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
