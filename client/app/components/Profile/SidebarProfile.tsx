// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { RiLockPasswordLine } from 'react-icons/ri';
// import { SiCoursera } from 'react-icons/si';
// import { AiOutlineLogout } from 'react-icons/ai';

// type Props = {
//     user:any;
//     active: number;
//     avatar: string | null;
//     setActive: (active: number) => void;
//     logOutHandler: any;
    
// };


//         const SideBarProfile = ({ active, avatar, setActive, user,logOutHandler }: Props) => {

//     return (
//         <div className="w-full">
//             <div
//                 className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
//                     }`}
//                 onClick={() => setActive(1)}
//             >
//                 <Image
//                     src={user?.avatar || avatar ? user.avatar || avatar : ''}
//                     alt="user-avatar"
//                     width={30}
//                     height={30}
//                     className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
//                 />
//                 <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
//                     My Account
//                 </h5>
//             </div>
//             <div
//                 className={`w-full flex items-center px-3 my-4 cursor-pointer ${active === 2 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
//                     }`}
//                 onClick={() => setActive(2)}
//             >
//                 <RiLockPasswordLine size={20} fill="#fff" />
//                 <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">Change Password</h5>
//             </div>
//             <div
//                 className={`w-full flex items-center px-3 my-4 cursor-pointer ${active === 3 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
//                     }`}
//                 onClick={() => setActive(3)}
//             >
//                 <SiCoursera size={20} fill="#fff" />
//                 <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">Enrolled Courses</h5>
//             </div>
//             <div
//                 className={`w-full flex items-center px-3 my-4 cursor-pointer ${active === 4 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
//                     }`}
//                 onClick={()=>logOutHandler()}
//             >
//                 <AiOutlineLogout size={20} fill="#fff" />
//                 <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">Log out</h5>
//             </div>
//         </div>
//     );
// };

// export default SideBarProfile;


"use client";

import React from "react";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { useSession } from "next-auth/react";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile = ({
  active,
  avatar,
  setActive,
  user,
  logOutHandler,
}: Props) => {
  // Default avatar image to use when user or avatar is null
  const defaultAvatar = "/assets/client-1.jpg"; // Update this path to your default 
const { data: session} = useSession();
  
  // Safely determine the avatar source
  const avatarSrc = user?.avatar.url || session?.user?.image || defaultAvatar;
  
  // Safely get user name or use a default
  const userName = user?.name || "User";

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={avatarSrc}
          alt={"user-avatar"}
          width={30}
          height={30}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          {userName} Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 my-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 my-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 my-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} fill="#fff" />
        <h5 className="pl-2 md:block hidden font-Poppins dark:text-white text-black">
          Log out
        </h5>
      </div>
    </div>
  );
};

export default  SideBarProfile;

