/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Slider from "react-slick";

interface propsType {
    images: {
        src: string;
        variant_ids: number[];
        position: string;
        is_default: boolean;
    }[];
    title: string;
}
const ProductCarousel: React.FC<propsType> = ({ images, title }) => {
    let result = images?.map((a) => a.src);

    var settings = {
        customPaging: function (i: number) {
            return <img src={result[i]} alt='' />;
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='w-full lg:sticky top-4 sm:flex gap-2'>
            <div className='space-y-3 w-full max-sm:mb-4 max-sm:gap-4'>
                <Slider {...settings}>
                    {result?.slice(0, 4).map((img, id) => (
                        <div key={id}>
                            <img
                                src={img}
                                alt={title}
                                className='w-[100%] md:h-auto rounded-xl object-cover object-left md:object-right-bottom'
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductCarousel;
