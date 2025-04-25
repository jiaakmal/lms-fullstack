// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

// const EditHero = () => {
//   const { data, isLoading } = useGetHeroDataQuery("Banner", {
//     refetchOnMountOrArgChange: true,
//   });
//   const [editLayout , {isSuccess , error }] = useEditLayoutMutation();

//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     if (data?.data?.banner) {
//       setTitle(data.data.banner.title || "");
//       setSubTitle(data.data.banner.subTitle || "");
//       setImage(data.data.banner.image[0]?.url || "");
//     }
//   }, [data]);

//   if (isLoading) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="w-full max-w-5xl mx-auto mt-30 p-6 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
//         Hero Banner Preview
//       </h2>

//       <div className="flex flex-col md:flex-row items-center justify-center gap-10">
//         {/* Left side - Image */}
//         {image && (
//           <div className="w-[220px] h-[220px] rounded-full overflow-hidden shadow-lg border-4 border-gray-200 dark:border-gray-700">
//             <Image
//               src={image}
//               alt="Hero Banner"
//               width={220}
//               height={220}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         )}

//         {/* Right side - Title & Subtitle */}
//         <div className="text-center md:text-left">
//           <h3 className="text-2xl font-semibold font-Poppins text-gray-900 dark:text-white mb-2">
//             {title}
//           </h3>
//           <p className="text-gray-700 dark:text-gray-300">{subTitle}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditHero;

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import clsx from "clsx";
import { AiOutlineCamera } from "react-icons/ai";

const EditHero = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error ,isLoading:isUpdating }] = useEditLayoutMutation();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editSubTitle, setEditSubTitle] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (data?.data?.banner) {
      const banner = data.data.banner;
      const img = Array.isArray(banner.image)
        ? banner.image[0]?.url
        : banner.image?.url || "";

      setImage(img);
      setTitle(banner.title || "");
      setSubTitle(banner.subTitle || "");
      setEditTitle(banner.title || "");
      setEditSubTitle(banner.subTitle || "");
      setIsEdited(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.banner) {
      const banner = data.data.banner;
      const img = Array.isArray(banner.image)
        ? banner.image[0]?.url
        : banner.image?.url || "";
  
      setImage(img); // ← This will restore original image after save
      setTitle(banner.title || "");
      setSubTitle(banner.subTitle || "");
      setEditTitle(banner.title || "");
      setEditSubTitle(banner.subTitle || "");
      setIsEdited(false);
    }
  
    if (isSuccess) {
      toast.success("Hero banner updated successfully!");
    }
  
    if (error) {
      const errMsg =
        (error as any)?.data?.message || "Something went wrong during update!";
      toast.error(errMsg);
    }
  }, [data, isSuccess, error]);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString();
      if (base64) {
        setImage(base64);
        setIsEdited(true); // Mark changes
      }
    };
    reader.readAsDataURL(file);
  };
  

  const handleSave = async () => {
    await editLayout({
      type: "Banner",
      title: editTitle,
      subTitle: editSubTitle,
      image: image.startsWith("data:image") ? image : "", // Only send base64 if it's new
    });
  
    setTitle(editTitle);
    setSubTitle(editSubTitle);
    setIsEdited(false);
  
    refetch(); // Yeh dobara correct image laayega
  };
  
  

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto mt-30 p-6 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Hero Banner Preview
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative">
        {/* Image with Camera Icon */}
        <div className="relative">
          <div className="w-[220px] h-[220px] rounded-full overflow-hidden shadow-lg border-4 border-gray-200 dark:border-gray-700">
            {image ? (
              <Image
                src={image}
                alt="Hero Banner"
                width={220}
                height={220}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <div
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-3 right-3 bg-white dark:bg-[#333] p-1.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition"
          >
            <AiOutlineCamera size={18} className="text-gray-700 dark:text-white" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Editable Title & Subtitle */}
        <div className="flex flex-col gap-3 text-center md:text-left relative w-full">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              setIsEdited(true);
            }}
            className={clsx(
              "text-2xl font-semibold font-Poppins bg-transparent focus:outline-none",
              "text-gray-900 dark:text-white border-b-2 border-transparent focus:border-blue-500 transition"
            )}
          />
          <input
            type="text"
            value={editSubTitle}
            onChange={(e) => {
              setEditSubTitle(e.target.value);
              setIsEdited(true);
            }}
            className={clsx(
              "text-base font-medium bg-transparent focus:outline-none",
              "text-gray-700 dark:text-gray-300 border-b-2 border-transparent focus:border-blue-400 transition"
            )}
          />
          {isEdited && (
           <button
           onClick={handleSave}
           disabled={isUpdating}
           className="self-start mt-2 px-4 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
         >
           {isUpdating ? (
             <svg
               className="animate-spin h-4 w-4 text-white"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
             >
               <circle
                 className="opacity-25"
                 cx="12"
                 cy="12"
                 r="10"
                 stroke="currentColor"
                 strokeWidth="4"
               ></circle>
               <path
                 className="opacity-75"
                 fill="currentColor"
                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
               ></path>
             </svg>
           ) : (
             "Save"
           )}
         </button>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHero;
