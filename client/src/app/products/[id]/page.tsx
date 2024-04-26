/* eslint-disable @next/next/no-img-element */
import { formatCurrency } from "@/components/ProductCard";
import { Product } from "@/lib/printify/client";

async function getData(id: string): Promise<Product> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
    const data = await getData(params.id);

    const defaultImage = data?.images?.filter((img) => {
        return img.is_default === true;
    });

    return (
        <div className='mx-auto'>
            <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-2xl mx-auto'>
                <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='w-full lg:sticky top-4 sm:flex gap-2'>
                        <div className='sm:space-y-3 w-16 max-sm:flex max-sm:mb-4 max-sm:gap-4'>
                            {data.images.slice(0, 4).map((img, id) => (
                                <img
                                    key={id}
                                    src={img.src}
                                    alt='Product1'
                                    className='w-full cursor-pointer border rounded-lg'
                                />
                            ))}
                        </div>
                        <img
                            src={defaultImage[0]?.src}
                            alt={data.title}
                            className='w-full md:w-4/5 rounded-lg object-cover'
                        />
                    </div>
                    <div>
                        <h2 className='text-2xl font-extrabold'>
                            {data.title}
                        </h2>
                        <div className='flex flex-wrap gap-4 mt-4'>
                            <p className='text-xl font-bold'>
                                {formatCurrency(data.variants[0].price)}
                            </p>
                            <p className='text-gray-400 text-xl'>
                                <span className='line-through'>
                                    {formatCurrency(
                                        data.variants[0].price + 300
                                    )}
                                </span>
                                <span className='text-sm ml-1'>
                                    Tax included
                                </span>
                            </p>
                        </div>
                        <div className='flex space-x-2 mt-4'>
                            <svg
                                className='w-5 fill-black'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-black'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-black'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-black'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                            <svg
                                className='w-5 fill-[#CED5D8]'
                                viewBox='0 0 14 13'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                            </svg>
                        </div>

                        <div className='mt-8'>
                            <h3 className='text-lg font-bold'>Description</h3>
                            <div className='space-y-3 mt-4 text-sm'>
                                {data.description}
                            </div>
                        </div>
                        <div className='mt-8 max-w-md'>
                            <h3 className='text-lg font-bold'>Reviews(10)</h3>
                            <div className='space-y-3 mt-4'>
                                <div className='flex items-center'>
                                    <p className='text-sm font-bold'>5.0</p>
                                    <svg
                                        className='w-5 fill-black ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                                    </svg>
                                    <div className='bg-gray-300 rounded w-full h-2 ml-3'>
                                        <div className='w-2/3 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm font-bold ml-3'>
                                        66%
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm font-bold'>4.0</p>
                                    <svg
                                        className='w-5 ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                                    </svg>
                                    <div className='bg-gray-300 rounded w-full h-2 ml-3'>
                                        <div className='w-1/3 h-full rounded'></div>
                                    </div>
                                    <p className='text-sm font-bold ml-3'>
                                        33%
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-smfont-bold'>3.0</p>
                                    <svg
                                        className='w-5 fill-black ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                                    </svg>
                                    <div className='bg-gray-300 rounded w-full h-2 ml-3'>
                                        <div className='w-1/6 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm font-bold ml-3'>
                                        16%
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-sm font-bold'>2.0</p>
                                    <svg
                                        className='w-5 fill-black ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                                    </svg>
                                    <div className='bg-gray-300 rounded w-full h-2 ml-3'>
                                        <div className='w-1/12 h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm font-bold ml-3'>8%</p>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-smfont-bold'>1.0</p>
                                    <svg
                                        className='w-5 fill-black ml-1'
                                        viewBox='0 0 14 13'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path d='M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z'></path>
                                    </svg>
                                    <div className='bg-gray-300 rounded w-full h-2 ml-3'>
                                        <div className='w-[6%] h-full rounded bg-black'></div>
                                    </div>
                                    <p className='text-sm font-bold ml-3'>6%</p>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='w-full mt-8 px-4 py-2 bg-transparent border-2 border-black font-bold rounded'
                            >
                                Read all reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
