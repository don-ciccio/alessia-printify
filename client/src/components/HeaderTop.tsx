"use client";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { languages, fallbackLng } from "@/app/i18n/settings";
import { usePathname, useRouter } from "next/navigation";

interface propsType {
    lng: string;
}
const HeaderTop: React.FC<propsType> = ({ lng }) => {
    const pathname = usePathname();

    const router = useRouter();
    const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value as string;

        // ...if the user chose Arabic ("ar-eg"),
        // router.replace() will prefix the pathname
        // with this `newLocale`, effectively changing
        // languages by navigating to `/ar-eg/about`.
        router.replace(newLocale);
    };

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
                        <select
                            className='text-gray-500 text-[13px] w-[70px]'
                            name='currency'
                            id='currency'
                        >
                            <option value='EUR €'>EUR €</option>
                            <option value='USD $'>USD $</option>
                        </select>
                        <select
                            className='text-gray-500 text-[13px] w-[80px] cursor-pointer'
                            name='language'
                            id='language'
                            value={pathname}
                            onChange={changeLocale}
                        >
                            {languages.map((l, index) => {
                                return (
                                    <option value={`/${l}`} key={index}>
                                        {l}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
