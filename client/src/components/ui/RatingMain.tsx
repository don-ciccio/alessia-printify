import React from "react";

type RatingProps = {
    value: number;
    text: string;
};

export const RatingMain: React.FC<RatingProps> = ({ value, text }) => {
    return (
        <div className=''>
            <div className='flex space-x-2 text-yellow-500'>
                {value >= 1 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                ) : value >= 0.5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
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
                ) : (
                    <svg
                        className='w-5 fill-[#CED5D8]'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                )}
                {value >= 2 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                ) : value >= 1.5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
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
                ) : (
                    <svg
                        className='w-5 fill-[#CED5D8]'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                )}
                {value >= 3 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                ) : value >= 2.5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
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
                ) : (
                    <svg
                        className='w-5 fill-[#CED5D8]'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                )}
                {value >= 4 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                ) : value >= 3.5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
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
                ) : (
                    <svg
                        className='w-5 fill-[#CED5D8]'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                )}
                {value >= 5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                ) : value >= 4.5 ? (
                    <svg
                        className='w-5 fill-accent'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
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
                ) : (
                    <svg
                        className='w-5 fill-[#CED5D8]'
                        viewBox='0 0 14 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                    </svg>
                )}
            </div>

            {text && (
                <span className='text-sm block pl-1 capitalize'>{text}</span>
            )}
        </div>
    );
};
