"use client";

import Image from "next/image";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState,  } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.png";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo = ({ avatar, user }:Props) => {
  const [name, setName] = useState(user && user.name || "");
  const [updateAvatar , {isSuccess , error}] = useUpdateAvatarMutation();
  
  const [loadUser ,setLoadUser] = useState(false);
  const {}= useLoadUserQuery(undefined ,{skip : loadUser ? false : true});
  const [editProfile , {isSuccess:success , error:updatedError}] = useEditProfileMutation();





  const imageHandler = async (e: any) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = ()=>{
    if(fileReader.readyState === 2){
     const  avatar = fileReader.result
        updateAvatar(avatar)
    }
  }
  fileReader.readAsDataURL(e.target.files[0])
  };
  useEffect(() => {
    if(isSuccess || success){
      setLoadUser(true);
    }
    if(success){
     toast.success("profile updated successfully")
    }
      if(error || updatedError){
        console.log(error)
      }
  

  }, [isSuccess,error , success , updatedError])
  

  const handleSubmit = async (e: any) => {
   e.preventDefault();
   if(name !== ""){
   await  editProfile({
      name:name,
      email:user.email
    })
   }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col items-center gap-6 mt-12"
    >
      {/* Avatar */}
      <div className="relative w-[120px] h-[120px]">
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
          alt="User Avatar"
          fill
          className="rounded-full object-cover border-[3px] border-[#373a3a]"
        />
        <label
          htmlFor="avatar"
          className="absolute bottom-2 right-2 bg-black p-2 rounded-full cursor-pointer"
        >
          <AiOutlineCamera className="text-white" size={18} />
        </label>
        <input
          type="file"
          onChange={imageHandler}
          className="hidden"
          id="avatar"
        />
      </div>

      {/* Input Fields */}
      <div className="w-full flex flex-col gap-4 px-4">
        <div>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            required
            className={`${styles.input} w-full`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            readOnly
            className={`${styles.input} w-full`}
            value={user?.email}
          />
        </div>
      </div>

      {/* Update Button */}
      <button
        type="submit"
        className="w-[120px] h-[40px] border border-[#373a3a] text-white bg-black rounded-[8px] hover:opacity-90 transition"
      >
        Update
      </button>
    </form>
  );
};

export default ProfileInfo;
