"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/TheameSwitcher";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};


const Header = ({ activeItem, open, setOpen, route, setRoute, }: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const user = useSelector((state: any) => state.auth);
  const{ data}  = useSession();
  console.log("user of state :",user);
  console.log("data of session :" , data);
  const [socialAuth , {isSuccess , error}] = useSocialAuthMutation();
  const [logout , setLogout] = useState(false);
      const { } = useLogOutQuery(undefined, {
          skip: !logout ? true : false,
      });

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
  useEffect(() => {
    if (!user) {
      if(data){
        socialAuth(
          {email:data?.user?.email,
          name:data?.user?.name,
          avatar:data?.user?.image
        });
      }
    }
    if(data === null){
      if(isSuccess)
    {
      toast.success("Logged in successfully");    
    }
    }

    if(data === null || ""){
      setLogout(true);
    }
    if (error) {
        console.log("Error", error);
        if ("data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message || "Something went wrong");
        }
        else {
            toast.error("Something went wrong");
        }
    }

}, [user,data]);
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  }

    return (
      <div className="w-full relative">
        <div
          className={`${active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff44] border-b-[#ffffff44] dark:shadow transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "
            }`}
        >
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
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
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>

                {
                user ? (
                  <Link href="/profile">
                    <Image
                      src={user.image ? user.image  : "/assets/client-1.jpg"}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full cursor-pointer"
                    />

                  </Link>

                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className=" hidden md:block cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )
              }

              </div>
            </div>
          </div>

          {/* MOBILE SIDE BAR */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                {/* Navigation Items */}
                <NavItems activeItem={activeItem} isMobile={true} />

                {/* User Icon */}
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                  onClick={() => {
                    setRoute("Login"); // or "Sign-Up" if that’s default
                    setOpen(true);
                  }}// Open user modal or menu
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
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login} />
                )

              }

            </>
          )
        }
        {
          route === "Sign-Up" && (
            <>
              {
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={SignUp} />
                )

              }

            </>
          )
        }
        {
          route === "Verification" && (
            <>
              {
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification} />
                )

              }

            </>
          )
        }

      </div>
    );
  };

  export default Header;