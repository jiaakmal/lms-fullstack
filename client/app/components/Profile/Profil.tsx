'use client';

import React, { useEffect, useState } from 'react';
import SidebarProfile from './SidebarProfile'
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';


type Props = {
user : any          
};

const Profile = ({user}:Props) => {
  const [scroll, setScroll] = useState(false);
  const [avatar , setAvatar] =  useState(null);
  const [active  , setActive] = useState(1);
    const [logout , setLogout] = useState(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });
  const logOutHandler =async () => {

   setLogout(true);
   await signOut();
   redirect("/");
  }
      

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] md:w-[310px] md:h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky z-[40] ${
          scroll ? 'top-[12px]' : 'top-[30px]'
        } left-[30px]`}
      >
        <SidebarProfile  
        user={user}
        active = {active}
        setActive = {setActive}
        avatar = {avatar}
      logOutHandler = {logOutHandler}
        />
      </div>
    </div>
  );
};

export default Profile;
