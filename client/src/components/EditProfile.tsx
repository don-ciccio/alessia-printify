"use client";
import { useTranslation } from "@/app/i18n/client";
import { UserDocument } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface propsType {
    lng: string;
}

const EditProfile: React.FC<propsType> = ({ lng }) => {
    const labelStyles = "block text-base mb-1";
    const { t } = useTranslation(lng, "checkout");

    const [user, setUser] = useState<UserDocument>({} as UserDocument);
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user as UserDocument);
        }
    }, [session]);
    return (
        <div className='grid gap-4 py-4'>
            <div>
                <label htmlFor='Phone' className={labelStyles}>
                    {t("firstName")}
                </label>
                <input
                    id='name'
                    defaultValue={session?.user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none appearance-none focus:ring-1 ring-accent'
                />
            </div>
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
                    onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                    }
                    className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none appearance-none focus:ring-1 ring-accent'
                />
            </div>
            <button
                onClick={() => {
                    update({ ...user });
                }}
                className='w-2/3 text-center text-base p-2.5 h-full transition-all hover:bg-blackish bg-accent rounded-lg text-white'
            >
                Save changes
            </button>
        </div>
    );
};

export default EditProfile;
