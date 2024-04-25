"use client";
import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = () => {
    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
    };

    const slideData = [
        {
            id: 0,
            img: "/confident-asian-woman-shouting-megaphone-screaming-protesting-girl-activist-using-speaker-speak-louder-standing-white-background.jpg",
            title: "Trending Item",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "20€",
        },
        {
            id: 1,
            img: "/happy-asian-woman-shouting-megaphone-making-announcement-advertising-something-standing-whit.jpg",
            title: "Trending Accessories",
            mainTitle: "MODERN SUNGLASSES",
            price: "15€",
        },
        {
            id: 2,
            img: "/image-young-woman-korean-activist-recruiter-screaming-megaphone-searching-shouting-loudspeaker-standing-white-background.jpg",
            title: "Sale offer",
            mainTitle: "NEW FASHION SUMMER SALE",
            price: "30€",
        },
    ];
    return (
        <div>
            <div className='container pt-6 lg:pt-0'>
                <Slider {...settings}>
                    {slideData.map((item) => (
                        <Slide
                            key={item.id}
                            img={item.img}
                            title={item.title}
                            mainTitle={item.mainTitle}
                            price={item.price}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Hero;
