"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/TheamSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  activeItem: number;
};

const Header = ({ activeItem, open, setOpen }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff44] border-b-[#ffffff44] dark:shadow transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] border-b-[#ffffff1c] z-[80px] dark:shadow transition duration-500"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="flex items-center justify-between p-3">
            <Link href="/">
              <div className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                E-Learning
              </div>
            </Link>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobiles */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* MOBILE SIDE BAR */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose} // Close sidebar when clicking outside
            id="screen"
          >
            <div className="w-[70%] fixed z-[9999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              {/* Navigation Items */}
              <NavItems activeItem={activeItem} isMobile={true} />

              {/* User Icon */}
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)} // Open user modal or menu
              />
              <br />
              <br />
              <p className="">Copyright 2025 E-learning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
