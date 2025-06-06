

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
import { useSocialAuthMutation, useLogOutQuery } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header = ({ activeItem, open, setOpen, route, setRoute, }: Props) => {
  // Client-side state
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  
  // Default avatar path - ensure this is consistent
  const defaultAvatar = "/assets/client-1.jpg";
  
  // Redux and session state
  const authState = useSelector((state: any) => state.auth);
  const user = authState?.user || null;
  const { data: session, status } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  
  const { data: logoutData, isSuccess: isLogoutSuccess } = useLogOutQuery(undefined, {
    skip: !shouldLogout,
  });

  // Set isClient to true after component mounts to ensure we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle social authentication
  useEffect(() => {
    if (!isClient) return; // Skip this effect on server-side
    
    if (status === "authenticated" && session && (!user || Object.keys(user || {}).length === 0)) {
      socialAuth({
        email: session.user?.email,
        name: session.user?.name,
        avatar: session.user?.image,
      });
    }
    
    if (isSuccess) {
      toast.success("Login successful");
    }
    
    if (status === "unauthenticated" && shouldLogout) {
      setShouldLogout(false);
      setRoute("Login");
    }
  }, [session, status, user, isSuccess, socialAuth, setRoute, shouldLogout, isClient]);

  // Handle successful logout
  useEffect(() => {
    if (!isClient) return; // Skip this effect on server-side
    
    if (isLogoutSuccess) {
      setShouldLogout(false);
      toast.success("Logged out successfully");
      setRoute("Login");
    }
  }, [isLogoutSuccess, setRoute, isClient]);

  // Handle scroll effect
  useEffect(() => {
    if (!isClient) return; // Skip this effect on server-side
    
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
  }, [isClient]);
  
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  }

  const handleUserClick = () => {
    setRoute("Login");
    setOpen(true);
  };

  // Determine if user is authenticated - only on client side
  const isAuthenticated = isClient && user && Object.keys(user).length > 0;
  
  // Get avatar source safely
  const avatarSrc = isClient ? (user?.avatar?.url || session?.user?.image || defaultAvatar) : defaultAvatar;

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
              
              {/* Mobile menu button */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* User profile or login button - only render conditionally on client */}
              {isClient && (
                isAuthenticated ? (
                  <Link href="/profile">
                    <Image
                      src={avatarSrc}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full cursor-pointer"
                      style={{border: activeItem === 5 ? "2px solid #ffc107": ""}}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="hidden md:block cursor-pointer dark:text-white text-black"
                    onClick={handleUserClick}
                  />
                )
              )}
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

              {/* User Icon - only render conditionally on client */}
              {isClient && (
                isAuthenticated ? (
                  <Link href="/profile">
                    <Image
                      src={avatarSrc}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full cursor-pointer ml-5 mt-5"
                    />
                  </Link>
                ) : (
                  <div className="ml-5 mt-5">
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={handleUserClick}
                    />
                  </div>
                )
              )}
              <br />
              <br />
              <p className="pl-5 px-2 text-[16px] text-black dark:text-white">Copyright 2025 E-learning</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals - only render on client side */}
      {isClient && (
        <>
          {route === "Login" && open && (
            <CustomModal 
              open={open} 
              setOpen={setOpen} 
              setRoute={setRoute} 
              activeItem={activeItem} 
              component={Login} 
            />
          )}
          
          {route === "Sign-Up" && open && (
            <CustomModal 
              open={open} 
              setOpen={setOpen} 
              setRoute={setRoute} 
              activeItem={activeItem} 
              component={SignUp} 
            />
          )}
          
          {route === "Verification" && open && (
            <CustomModal 
              open={open} 
              setOpen={setOpen} 
              setRoute={setRoute} 
              activeItem={activeItem} 
              component={Verification} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
