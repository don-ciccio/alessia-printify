import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className='hidden lg:block'>
            <div className='container'>
                <div className='flex w-fit gap-10 mx-auto font-semibold text-[19px] py-4 text-blackish'>
                    <Link className='navbar__link relative' href='/'>
                        Home
                    </Link>
                    <Link className='navbar__link relative' href='/'>
                        T-shirts
                    </Link>
                    <Link className='navbar__link relative' href='/'>
                        Hoodies
                    </Link>
                    <Link className='navbar__link relative' href='/'>
                        Mugs
                    </Link>
                    <Link className='navbar__link relative' href='/'>
                        Blog
                    </Link>
                    <Link className='navbar__link relative' href='/'>
                        HOT OFFERS
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
