import { useTranslation } from "@/app/i18n";
import Link from "next/link";
import React from "react";

interface propsType {
    lng: string;
}
const Navbar: React.FC<propsType> = async ({ lng }) => {
    const { t } = await useTranslation(lng);
    return (
        <div className='hidden lg:block'>
            <div className='container'>
                <div className='flex w-fit gap-10 mx-auto font-semibold text-[19px] py-4 text-blackish'>
                    <Link className='navbar__link relative' href={`/${lng}`}>
                        {t("menu.home")}
                    </Link>
                    <Link
                        className='navbar__link relative'
                        href={`/${lng}/T-shirts`}
                    >
                        {t("menu.t-shirts")}
                    </Link>
                    <Link
                        className='navbar__link relative'
                        href={`/${lng}/Posters`}
                    >
                        {t("menu.indoor")}
                    </Link>
                    <Link
                        className='navbar__link relative'
                        href={`/${lng}/Sweatshirts`}
                    >
                        {t("menu.hoodies")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
