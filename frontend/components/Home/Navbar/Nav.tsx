import React from 'react'
import Image from "next/image"
import Logo from "@/public/images/logo.svg"
import NavLinks from "@/constant/constant"
import Link from 'next/link'

const Nav = () => {
    return (
        <div className="transition-all duration-200 top-0 left-0 z-[100] fixed w-full p-[20px]">

            <div className="flex items-center justify-between">
                {/* Logo */}
                <Image src={Logo} alt="Logo" />

                {/* Navlinks */}
                <div className="hidden lg:flex items-center space-x-10">
                    {NavLinks.map((link) => {
                        return <Link href={link.url} key={link.id} className="text-base font-medium hover:font-semibold">
                            <p>{link.label}</p>
                        </Link>
                    })}
                </div>

                {/* Button */}
                <div className="flex items-center space-x-4">
                    {/* 1st button create account button */}
                    <a href="#" className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"></a>
                </div>

            </div>
        </div>
    )
}

export default Nav
