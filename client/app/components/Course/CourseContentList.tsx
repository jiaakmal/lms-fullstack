// import React, { FC, useState } from "react";
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// type Props = {
//   data: any;
//   activeVideo?: string;
//   setActiveVideo?: any;
//   isDemo: boolean;
// };

// const CourseContentList: FC<Props> = (props) => {
//   const [visibleSection, setVisibleSection] = useState<Set<string>>(
//     new Set<string>()
//   );

//   // find unique video section

//   const videoSection: string[] = [
//     ...new Set<string>(props.data?.map((item: any) => item?.videoSection)),
//   ];

//   //total count of videos from previous section

//   let totalCount: number = 0;
//   // toogle section

//   const toggleSection = (section: string) => {
//     const newVisibleSection = new Set(visibleSection);
//     if (newVisibleSection.has(section)) {
//       newVisibleSection.delete(section);
//     } else {
//       newVisibleSection.add(section);
//     }
//     setVisibleSection(newVisibleSection);
//   };

//   return (
//     <div
//       className={`mt-4 w-full ${
//         !props.isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
//       }`}
//     >
//       {videoSection.map((section: string, sectionIndex: number) => {
//         const isSectionVisible = visibleSection.has(section);

//         //filter video by section

//         const sectionVideos: any[] = props.data.filter(
//           (item: any) => item.videoSection === section
//         );

//         const sectionVideoCount: number = sectionVideos.length;

//         const sectionVideoLength: number = sectionVideoCount.reduce(
//           (totalLenagth: number, item: any) => totalLenagth + item.videoLength,
//           0
//         );
//         const sectionStartIndex: number = totalCount;
//         totalCount += sectionVideoCount;

//         const sectionContantHours: number = sectionVideoLength / 60;
//         return (
//           <div
//             key={section}
//             className={`mt-4 w-full ${
//               !props.isDemo && "border-b border-gray-200 pb-2"
//             }`}
//           >
//             <div className="w-full flex">
//               <div className="flex w-full items center justify-center">
//                 <h2 className="text-2xl  dark:text-white text-black">
//                   {section}
//                 </h2>
//                 <button
//                   className="mr-4 cursor-pointer text-black dark:text-white"
//                   onClick={() => toggleSection(section)}
//                 >
//                   {isSectionVisible ? (
//                     <BsChevronUp size={20} />
//                   ) : (
//                     <BsChevronDown size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <h5>
//               {sectionVideoCount} Lessons .{" "}
//               {sectionVideoLength < 60
//                 ? sectionVideoLength
//                 : sectionContantHours.toFixed(2)}{" "}
//               {sectionVideoLength > 60 ? "Hours" : "Minutes"}
//             </h5>
//             <br />
//             {isSectionVisible && (
//               <div className="w-full">
//                 {sectionVideos.map((item: any, index: number) => {
//                   const videoIndex: number = sectionStartIndex + index;
//                   const contentLength: number = item.videoLength / 60;
//                   return (
//                   <div
//                   className={`w-full ${videoIndex === props.activeVideo ? "bg-slate-800" : ""} cursor-pointer transition-all p-2`}
//                   key={item._id}
//                   onClick={()=> props.isDemo ? null : props?.setActiveVideo(videoIndex)}
//                   >
//                     <div className="flex items-start">
//                       <div className="">
//                         <MdOutlineOndemandVideo size={25} className="mr-2 " color="#1cdada"/>
//                       </div>
//                       <h1 className="text-xl  inline-block break-words text-black dark:text-white">{item.title}</h1>

//                     </div>
//                     <h5>
//                       {
//                         item.videoLength >60  ?  contentLength.toFixed(2) : item.videoLength }
//                         {item.videoLength >60 ? "Hours" : "Minutes"}
//                         </h5>


//                   </div>);
//                 })}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CourseContentList;

import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  console.log("CourseContentList data: ", data);

  const [visibleSection, setVisibleSection] = useState<Set<string>>(new Set<string>());

  // Get unique video sections
  const videoSection: string[] = [...new Set<string>(data?.map((item: any) => item?.videoSection))];

  let totalCount = 0;

  const toggleSection = (section: string) => {
    const newVisibleSection = new Set(visibleSection);
    if (newVisibleSection.has(section)) {
      newVisibleSection.delete(section);
    } else {
      newVisibleSection.add(section);
    }
    setVisibleSection(newVisibleSection);
  };

  return (
    <div className={`mt-4 w-full ${!isDemo && "ml-[-30px] sticky top-24 left-0 z-30"}`}>
      {videoSection.map((section: string) => {
        const isSectionVisible = visibleSection.has(section);
        const sectionVideos = data.filter((item: any) => item.videoSection === section);
        const sectionVideoLength = sectionVideos.reduce(
          (total: number, item: any) => total + item.videoLength,
          0
        );
        const sectionStartIndex = totalCount;
        totalCount += sectionVideos.length;

        const sectionDuration =
          sectionVideoLength > 60
            ? `${(sectionVideoLength / 60).toFixed(2)} Hours`
            : `${sectionVideoLength} Minutes`;

        return (
          <div key={section} className={`mt-4 w-full ${!isDemo && "border-b border-gray-200 pb-2"}`}>
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl dark:text-white text-black">{section}</h2>
              <button
                className="mr-4 cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
              </button>
            </div>

            <h5 className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {sectionVideos.length} Lessons ・ {sectionDuration}
            </h5>

            {isSectionVisible && (
              <div className="w-full mt-2">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex = sectionStartIndex + index;
                  const videoDuration =
                    item.videoLength > 60
                      ? `${(item.videoLength / 60).toFixed(2)} Hours`
                      : `${item.videoLength} Minutes`;

                  return (
                    <div
                      key={item._id}
                      onClick={() => (isDemo ? null : setActiveVideo?.(videoIndex))}
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2 rounded-md`}
                    >
                      <div className="flex items-start gap-2">
                        <MdOutlineOndemandVideo size={25} color="#1cdada" />
                        <div>
                          <h1 className="text-lg font-medium text-black dark:text-white break-words">
                            {item.title}
                          </h1>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{videoDuration}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;

