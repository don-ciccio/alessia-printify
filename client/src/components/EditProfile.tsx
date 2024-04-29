"use client";
import { UserDocument } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const EditProfile = () => {
    const [user, setUser] = useState<UserDocument>({} as UserDocument);
    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user as UserDocument);
        }
    }, [session]);
    return (
        <div className='grid gap-4 py-4'>
            <div className='grid items-center grid-cols-4 gap-4'>
                <label htmlFor='name' className='text-right'>
                    Name
                </label>
                <input
                    id='name'
                    defaultValue={session?.user?.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                />
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
                <label htmlFor='Email' className='text-right'>
                    Email
                </label>
                <input
                    id='email'
                    defaultValue={session?.user?.email}
                    disabled={session?.user?.image ? true : false}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                />
            </div>
            <div className='grid items-center grid-cols-4 gap-4'>
                <label htmlFor='Phone' className='text-right'>
                    Phone
                </label>
                <input
                    id='phone'
                    defaultValue={session?.user?.phone}
                    disabled={session?.user?.image ? true : false}
                    onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                    }
                    className='col-span-2 border-gray-200 border p-2 px-4 rounded-lg w-full outline-none'
                />
            </div>
        </div>
    );
};

export default EditProfile;
