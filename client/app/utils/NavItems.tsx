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
      <div className="hidden md:flex">
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
        <div className="md:hidden mt-5 ">
          {navItemData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`
                        ${
                          activeItem === index
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-white text-black"
                        } text-[18px px-6 font-Poppins font-[400]`}
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
