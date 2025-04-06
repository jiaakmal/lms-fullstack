// import Image from "next/image";
// import Link from "next/link";
// import React, { FC } from "react";
// import { BiSearch } from "react-icons/bi";

// type Props = {};

// const Hero: FC<Props> = (props) => {
//   return (
//     <div className="w-full 1000px:flex items-center">
//       {/* Left Section */}
//       <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:w-[600] 1100px:h-[600] h-[50vh] w-[50vh] hero_animation rounded-full">
//         <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-[10]">
//           <Image
//             src={require("../../../public/assets/banner-img-1.png")}
//             alt="Hero Banner"
//             className="object-contain 1100px:max-w-[90%] w-[90%] 1000px:max-w-[85%] h-[auto] z-[10]"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
//         <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[85%]">
//           Improve Your Online Learning Experience Better Instantly
//         </h2>
//         <br/>
//         <p className="dark:text-[#edf1f4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:!w-[78%]">
//           We have 40K+ Online courses & 500K+ Online registered students. Find
//           your desired Courses from them.
//         </p>
//         <br />
//         <br />

//         {/* Search Bar */}
//         <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
//           <input
//             type="search"
//             placeholder="Search Courses..."
//             className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
//           />
//           <div className="absolute flex items-center justify-center w-[50px] h-[50px] cursor-pointer right-0 top-0 bg-[#39c1f3]  rounded-r-[5px]">
//             <BiSearch size={30} className="text-white"/>
//           </div>
//         </div>
//         <br />
//         <br/>

//         {/* Client Logos */}
//         <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center ">
//           <Image
//             src={require("../../../public/assets/client-1.jpg")}
//             alt="Client 1"
//             className="rounded-full h-[50px] w-[50px]"
//           />
//           <Image
//             src={require("../../../public/assets/client-2.jpg")}
//             alt="Client 2"
//             className="rounded-full  h-[50px] w-[50px] ml-[-20px]"
//           />
//           <Image
//             src={require("../../../public/assets/client-3.jpg")}
//             alt="Client 3"
//             className="rounded-full h-[50px] w-[50px]  ml-[-20px]"
//           />
          
//         {/* Call to Action */}
//         <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
//           500K+ People already trusted us.{" "}
//           <Link href="/courses">
//             <span className="dark:text-[#46e256] text-[crimson] ">
//               View Courses
//             </span>
//           </Link>{" "}
//         </p>
//         </div>
       

//       </div>
//     </div>
//   );
// };

// export default Hero;
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full flex items-center justify-between bg-gradient-to-b from-gray-900 to-black py-10 px-6 1000px:px-16">
      {/* Left Section */}
      <div className="relative h-[50vh] w-[50vh] 1000px:h-[600px] 1000px:w-[600px] rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] flex items-center justify-center overflow-hidden">
        <Image
          src={require("../../../public/assets/banner-img-1.png")}
          alt="Hero Banner"
          className="object-contain w-[80%] h-[80%]"
        />
      </div>

      {/* Right Section */}
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:items-start text-center 1000px:text-left mt-[50px] 1000px:mt-0">
        <h2 className="dark:text-white text-[#ffffff] text-[30px] 1000px:text-[50px] font-bold font-Josefin leading-[1.2]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="dark:text-[#edf1f4] text-[#ffffffcc] font-Josefin font-medium text-[18px] mt-4 1000px:w-[80%]">
          We have 40K+ Online courses & 500K+ Online registered students. Find
          your desired Courses from them.
        </p>

        {/* Search Bar */}
        <div className="w-full 1000px:w-[80%] mt-6 relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="w-full py-3 px-4 rounded-full bg-[#ffffff] text-[#000000] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded-full">
            <BiSearch size={20} />
          </button>
        </div>

        {/* Client Logos */}
        <div className="flex items-center mt-6 space-x-[-10px]">
          <Image
            src={require("../../../public/assets/client-1.jpg")}
            alt="Client 1"
            className="rounded-full h-[50px] w-[50px] border-2 border-white"
          />
          <Image
            src={require("../../../public/assets/client-2.jpg")}
            alt="Client 2"
            className="rounded-full h-[50px] w-[50px] border-2 border-white"
          />
          <Image
            src={require("../../../public/assets/client-3.jpg")}
            alt="Client 3"
            className="rounded-full h-[50px] w-[50px] border-2 border-white"
          />
        </div>

        {/* Call to Action */}
        <p className="font-Josefin dark:text-[#edf1f4] text-[#ffffffcc] text-[16px] mt-4">
          500K+ People already trusted us.{" "}
          <Link href="/courses">
            <span className="text-green-400 underline">View Courses</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Hero;