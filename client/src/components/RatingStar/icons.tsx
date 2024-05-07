import * as React from "react";

export function BsStar(props: any) {
    return (
        <svg
            className='w-5 fill-[#CED5D8]'
            viewBox='0 0 14 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
        </svg>
    );
}

export function BsStarFill(props: any) {
    return (
        <svg
            className='w-5 fill-accent'
            viewBox='0 0 14 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
        </svg>
    );
}

export function BsStarHalf(props: any) {
    return (
        <svg
            className='w-5 fill-accent'
            viewBox='0 0 14 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <defs>
                <linearGradient id='grad'>
                    <stop offset='50%' stopColor='#FF8F9C' />
                    <stop offset='50%' stopColor='#CED5D8' />
                </linearGradient>
            </defs>

            <path
                fill='url(#grad)'
                d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'
            ></path>
        </svg>
    );
}
