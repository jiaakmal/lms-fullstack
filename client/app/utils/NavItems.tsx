import Link from "next/link";
import React from "react";

export const navItemData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};
function NavItems({ activeItem, isMobile }: Props) {
  return (
    <>
      <div className="hidden 800px:flex ">
        {navItemData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`
                        ${
                          activeItem === index
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-white text-black"
                        } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-10 flex flex-col items-start space-y-4">
          {/* <div className="w-full  text-center py-5">
            <Link href="/">
              <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                E-Learning
              </span>
            </Link>
          </div> */}
          {navItemData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`
                        ${
                          activeItem === index
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-white text-black"
                        }block  text-[18px] py-5 px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}


export default NavItems;
