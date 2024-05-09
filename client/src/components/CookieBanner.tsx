"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/helpers/storageHelper";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";

interface propsType {
    lng: string;
}
const CookieBanner: React.FC<propsType> = ({ lng }) => {
    const [cookieConsent, setCookieConsent] = useState(false);
    const { t } = useTranslation(lng, "cookie");
    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);

        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? "granted" : "denied";

        window.gtag("consent", "update", {
            analytics_storage: newValue,
        });

        setLocalStorage("cookie_consent", cookieConsent);
    }, [cookieConsent]);
    return (
        <div
            className={`${
                cookieConsent === true
                    ? "hidden"
                    : "flex  flex-col fixed inset-x-0 bottom-0 z-20  justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8 xs:block"
            }`}
        >
            <p className='max-w-4xl text-sm leading-6 text-gray-900'>
                {t("cookie")}{" "}
                <Link className='font-semibold text-accent' href='/cookies'>
                    cookie
                </Link>
            </p>

            <div className='flex gap-2'>
                <div className='mr-16 flex flex-none items-center gap-x-5'>
                    <button
                        onClick={() => setCookieConsent(true)}
                        type='button'
                        className='rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
                    >
                        {t("accept")} 🍪
                    </button>
                    <button
                        onClick={() => setCookieConsent(false)}
                        type='button'
                        className='text-sm font-semibold leading-6 text-blackish'
                    >
                        {t("reject")}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CookieBanner;
