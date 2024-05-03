import React from "react";

type MessageProps = {
    variant: "danger" | "info" | "success" | "secondary";
    children: React.ReactNode;
};

export const Message: React.FC<MessageProps> = ({ variant, children }) => {
    if (variant === "secondary") {
        return (
            <div
                className='bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative my-2'
                role='alert'
            >
                <span className='block sm:inline'>{children}</span>
            </div>
        );
    }
    if (variant === "danger") {
        return (
            <div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2'
                role='alert'
            >
                <strong className='font-bold mr-3'>Error!</strong>
                <span className='block sm:inline'>{children}</span>
            </div>
        );
    }

    if (variant === "info") {
        return (
            <div
                className='bg-[#faf2f3] border border-[#f7c6cc] text-accent px-4 py-3 rounded-lg relative my-2'
                role='alert'
            >
                <span className='block sm:inline'>{children}</span>
            </div>
        );
    }

    return (
        <div
            className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-2'
            role='alert'
        >
            <strong className='font-bold mr-3'>Successful!</strong>
            <span className='block sm:inline'>{children}</span>
        </div>
    );
};
