// import { styles } from "@/app/styles/style";
// import NavItems from "@/app/utils/NavItems";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { AiFillEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
// import { BiLink } from "react-icons/bi";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any) => void;
//   handleSubmit: any;
// };

// const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

// const CourseContent = ({
//   active,
//   setActive,
//   courseContentData,
//   setCourseContentData,
//   handleSubmit: handleCourseSubmit,
// }: Props) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false)
//   );
//   const [activeSection, setActiveSection] = useState(1);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//   };
//   const handleToggleCollapse = (index: number) => {
//     const updatedCollapsed = [...isCollapsed];
//     updatedCollapsed[index] = !updatedCollapsed[index];
//     setIsCollapsed(updatedCollapsed);
//   };
//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     const updateData = deepClone(courseContentData);
//     updateData[index].links.splice(linkIndex, 1);
//     setCourseContentData(updateData);
//   };
//   const handleAddLink = (index: number) => {
//     const updateData = deepClone(courseContentData);
//     updateData[index].links.push({
//       title: "",
//       url: "",
//     });
//     setCourseContentData(updateData);
//   };
//   const newContentHandler = (item: any) => {
//     if (
//       item.title === '' ||
//       item.description === '' ||
//       item.links[0].title === '' ||
//       item.links[0].url === '' ||
//       item.videoUrl === ''
//     ) {
//       toast.error("Please fill all the fields");
//     } else {
//       let newVideoSection = "";
//       if (courseContentData.length > 0) {
//         const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
//         if (lastVideoSection) {
//           newVideoSection = lastVideoSection;
//         }
//       }
//       const newContent = {
//         videoSection: newVideoSection,
//        title: "",
//         videoUrl: "",
//   description: "",
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...deepClone(courseContentData), newContent]);
//     }
//   };
//   const addNewSection = () => {
//     if (
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields before adding a new section");
//     } else {
//       setActiveSection(activeSection + 1);
//       const newContent = {
//         videoSection: `Untitled Section ${activeSection}`,
//         title: "",
//         videoUrl: "",
//         description: "",
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...deepClone(courseContentData), newContent]);
//     }
//   };
//   const prevButton = () => {
//     setActive(active - 1);
//   };
//   const handleOptions = () => {
//     if (
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Section can not be empty");
//     } else {
//       setActive(active + 1);
//       handleCourseSubmit();
//     }
//   };

//   return (
//     <div className="w-[80%] m-auto mt-24">
//       <form onSubmit={handleSubmit}>
//         {courseContentData?.map((item: any, index: number) => {
//           const showSectionInput =
//             index === 0 ||
//             item.videoSection !== courseContentData[index - 1].videoSection;
//           return (
//             <div
//               key={index}
//               className={`w-full bg-[#cdcBcB17] p-4 ${
//                 showSectionInput ? "mt-10" : "mb-0"
//               }`}
//             >
//               {showSectionInput && (
//                 <>
//                   <div className="flex w-full items-center ">
//                     <input
//                       className={`text-xl ${
//                         item.videoSection === "Untitled Section"
//                           ? "w-[170px]"
//                           : "w-max"
//                       } font-Poppins cursor-pointer bg-transparent border-none outline-none  dark:text-white text-black `}
//                       value={item.videoSection}
//                       onChange={(e) => {
//                         const updateData = deepClone(courseContentData);
//                         updateData[index].videoSection = e.target.value;
//                         setCourseContentData(updateData);
//                       }}
//                     />
//                     <AiFillEdit className="cursor-pointer dark:text-white text-black" />
//                   </div>
//                   <br />
//                 </>
//               )}
//               <div className="w-full flex items-center justify-between my-0">
//                 {isCollapsed[index] ? (
//                   <>
//                     {item.title ? (
//                       <p className="font-Poppins dark:text-white text-black">
//                         {index + 1}. {item.title}
//                       </p>
//                     ) : null}
//                   </>
//                 ) : (
//                   <div></div>
//                 )}
//                 <div className="flex items-center ">
//                   <AiOutlineDelete
//                     className={`dark:text-white text-black text-xl mr-2 ${
//                       index > 0 ? "cursor-pointer" : "cursor-no-drop"
//                     } `}
//                     onClick={() => {
//                       if (index > 0) {
//                         const updateData = deepClone(courseContentData);
//                         updateData.splice(index, 1);
//                         setCourseContentData(updateData);
//                       }
//                     }}
//                   />
//                   <MdOutlineKeyboardArrowDown
//                     className="dark:text-white text-black"
//                     fontSize="large"
//                     style={{
//                       transform: isCollapsed[index]
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                       transition: "all 0.3s ease-in-out",
//                     }}
//                     onClick={() => handleToggleCollapse(index)}
//                   />
//                 </div>
//               </div>
//               {!isCollapsed[index] && (
//                 <>
//                   <div className="my-3">
//                     <label className={styles.label}>Video title</label>
//                     <input
//                       type="text"
//                       className={styles.input}
//                       placeholder="Enter video title"
//                       value={item.title}
//                       onChange={(e) => {
//                         const updateData = deepClone(courseContentData);
//                         updateData[index].title = e.target.value;
//                         setCourseContentData(updateData);
//                       }}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className={styles.label}>Video Url</label>
//                     <input
//                       type="text"
//                       className={styles.input}
//                       placeholder="Enter video Url"
//                       value={item.videoUrl}
//                       onChange={(e) => {
//                         const updateData = deepClone(courseContentData);
//                         updateData[index].videoUrl = e.target.value;
//                         setCourseContentData(updateData);
//                       }}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label className={styles.label}>Video description</label>
//                     <textarea
//                       rows={8}
//                       cols={30}
//                       className={`${styles.input} !h-min py-2`}
//                       placeholder="Enter video description"
//                       value={item.description}
//                       onChange={(e) => {
//                         const updateData = deepClone(courseContentData);
//                         updateData[index].description = e.target.value;
//                         setCourseContentData(updateData);
//                       }}
//                     />
//                   </div>
//                   <br />
//                   {item?.links.map((link: any, linkIndex: number) => (
//                     <div key={linkIndex} className="mb-3 block">
//                       <div className="w-full flex items-center justify-between">
//                         <label className={styles.label}>Link {linkIndex + 1}</label>
//                         <AiOutlineDelete
//                           className={`dark:text-white text-black text-xl mr-2 ${
//                             linkIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
//                           }`}
//                           onClick={() => handleRemoveLink(index, linkIndex)}
//                         />
//                       </div>
//                       <input
//                         type="text"
//                         className={styles.input}
//                         placeholder="Source code link title"
//                         value={link.title}
//                         onChange={(e) => {
//                           const updateData = deepClone(courseContentData);
//                           updateData[index].links[linkIndex].title = e.target.value;
//                           setCourseContentData(updateData);
//                         }}
//                       />
//                       <input
//                         type="text"
//                         className={`${styles.input} mt-6`}
//                         placeholder="Source code link url"
//                         value={link.url}
//                         onChange={(e) => {
//                           const updateData = deepClone(courseContentData);
//                           updateData[index].links[linkIndex].url = e.target.value;
//                           setCourseContentData(updateData);
//                         }}
//                       />
//                     </div>
//                   ))}
//                   <br />
//                   <div className="inline-block mb-4">
//                     <p
//                       className="flex items-center text-xl dark:text-white text-black cursor-pointer "
//                       onClick={() => {
//                         handleAddLink(index);
//                       }}
//                     >
//                       <BiLink className="mr-2" />Add Link
//                     </p>
//                   </div>
//                 </>
//               )}
//               <br />
//               {index === courseContentData.length - 1 && (
//                 <div>
//                   <p
//                     className="flex items-center text-xl dark:text-white text-black cursor-pointer "
//                     onClick={(e: any) => newContentHandler(item)}
//                   >
//                     <AiOutlinePlus className="mr-2" />Add New Content
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//         <br />
//         <div
//           className="flex items-center text-xl dark:text-white text-black cursor-pointer"
//           onClick={() => addNewSection()}
//         >
//           <AiOutlinePlus className="mr-2" />Add New Section
//         </div>
//       </form>
//       <br />
//       <div className="w-full flex items-center justify-between">
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => prevButton()}
//         >
//           Prev
//         </div>
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => handleOptions()}
//         >
//           Next
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default CourseContent;

import { styles } from "@/app/styles/style";
import NavItems from "@/app/utils/NavItems";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const CourseContent = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  
  const handleToggleCollapse = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };
  
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updateData = deepClone(courseContentData);
    updateData[index].links.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };
  
  const handleAddLink = (index: number) => {
    const updateData = deepClone(courseContentData);
    updateData[index].links.push({
      title: "",
      url: "",
    });
    setCourseContentData(updateData);
  };
  
  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.links[0].title === '' ||
      item.links[0].url === '' ||
      item.videoUrl === ''
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoSection: newVideoSection,
        title: "",
        videoUrl: "",
        videoLength: "", // Add videoLength
        description: "",
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...deepClone(courseContentData), newContent]);
    }
  };
  
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields before adding a new section");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoSection: `Untitled Section ${activeSection}`,
        title: "",
        videoUrl: "",
        videoLength: "", // Add videoLength
        description: "",
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...deepClone(courseContentData), newContent]);
    }
  };
  
  const prevButton = () => {
    setActive(active - 1);
  };
  
  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can not be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div
              key={index}
              className={`w-full bg-[#cdcBcB17] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <>
                  <div className="flex w-full items-center ">
                    <input
                      className={`text-xl ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-max"
                      } font-Poppins cursor-pointer bg-transparent border-none outline-none  dark:text-white text-black `}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updateData = deepClone(courseContentData);
                        updateData[index].videoSection = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                    <AiFillEdit className="cursor-pointer dark:text-white text-black" />
                  </div>
                  <br />
                </>
              )}
              <div className="w-full flex items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className="font-Poppins dark:text-white text-black">
                        {index + 1}. {item.title}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div></div>
                )}
                <div className="flex items-center ">
                  <AiOutlineDelete
                    className={`dark:text-white text-black text-xl mr-2 ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    } `}
                    onClick={() => {
                      if (index > 0) {
                        const updateData = deepClone(courseContentData);
                        updateData.splice(index, 1);
                        setCourseContentData(updateData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    className="dark:text-white text-black"
                    fontSize="large"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => handleToggleCollapse(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className={styles.label}>Video title</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter video title"
                      value={item.title}
                      onChange={(e) => {
                        const updateData = deepClone(courseContentData);
                        updateData[index].title = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>Video Url</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter video Url"
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updateData = deepClone(courseContentData);
                        updateData[index].videoUrl = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label className={styles.label}>Video Length (in minutes)</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Enter video length"
                      value={item.videoLength}
                      onChange={(e) => {
                        const updateData = deepClone(courseContentData);
                        updateData[index].videoLength = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label className={styles.label}>Video description</label>
                    <textarea
                      rows={8}
                      cols={30}
                      className={`${styles.input} !h-min py-2`}
                      placeholder="Enter video description"
                      value={item.description}
                      onChange={(e) => {
                        const updateData = deepClone(courseContentData);
                        updateData[index].description = e.target.value;
                        setCourseContentData(updateData);
                      }}
                    />
                  </div>
                  <br />
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="mb-3 block">
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>Link {linkIndex + 1}</label>
                        <AiOutlineDelete
                          className={`dark:text-white text-black text-xl mr-2 ${
                            linkIndex > 0 ? "cursor-pointer" : "cursor-no-drop"
                          }`}
                          onClick={() => handleRemoveLink(index, linkIndex)}
                        />
                      </div>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Source code link title"
                        value={link.title}
                        onChange={(e) => {
                          const updateData = deepClone(courseContentData);
                          updateData[index].links[linkIndex].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <input
                        type="text"
                        className={`${styles.input} mt-6`}
                        placeholder="Source code link url"
                        value={link.url}
                        onChange={(e) => {
                          const updateData = deepClone(courseContentData);
                          updateData[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                  ))}
                  <br />
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-xl dark:text-white text-black cursor-pointer "
                      onClick={() => {
                        handleAddLink(index);
                      }}
                    >
                      <BiLink className="mr-2" />Add Link
                    </p>
                  </div>
                </>
              )}
              <br />
              {index === courseContentData.length - 1 && (
                <div>
                  <p
                    className="flex items-center text-xl dark:text-white text-black cursor-pointer "
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <AiOutlinePlus className="mr-2" />Add New Content
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-xl dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlus className="mr-2" />Add New Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;

