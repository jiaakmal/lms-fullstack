"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/TheamSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login"; 
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";


type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  activeItem: number;
  route:string;
  setRoute : ( route:string) => void;
};

const Header = ({ activeItem, open, setOpen , route , setRoute,    }: Props) => {
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
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
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
                className=" hidden md:block cursor-pointer dark:text-white text-black"
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
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
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
              <p className=" pl-5 px-2  text-[16px] text-black dark:text-white">Copyright 2025 E-learning</p>
            </div>
          </div>
        )}
      </div>

      {/* login signup setup */}
     
      {
        route === "Login" && (
          <>
          {
            open &&(
              <CustomModal open={open} setOpen={setOpen}  setRoute={setRoute} activeItem={activeItem} component={Login}/>
            )

          }
          
        </>
        )
      }
       {
        route === "Sign-up" && (
          <>
          {
            open &&(
              <CustomModal open={open} setOpen={setOpen}  setRoute={setRoute} activeItem={activeItem} component={SignUp}/>
            )

          }
          
        </>
        )
      }
       {
        route === "Verification" && (
          <>
          {
            open &&(
              <CustomModal open={open} setOpen={setOpen}  setRoute={setRoute} activeItem={activeItem} component={Verification}/>
            )

          }
          
        </>
        )
      }
    </div>
  );
};

export default Header;
