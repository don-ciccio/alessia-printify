import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Signin from "@/components/Signin";

const Login = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    } else {
        return (
            <div className='mx-auto'>
                <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-2xl mx-auto'>
                    <Signin />
                </div>
            </div>
        );
    }
};

export default Login;
