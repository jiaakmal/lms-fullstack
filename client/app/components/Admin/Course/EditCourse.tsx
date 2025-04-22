// import { useEffect, useState } from "react";
// import CourseInformation from  './CourseInformation'
// import CourseOptions from './CourseOptions'
// import CourseData from './CourseData'
// import CourseContent from "./CourseContent";
// import CoursePreview from "./CoursePreview";
// import { useCreateCourseMutation, useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
// import toast from "react-hot-toast";
// import { redirect } from "next/navigation";
// type Props = {
//     id:string;
// };

// const EditCourse = ({id}: Props) => {
 
//   const { isLoading, data , refetch } = useGetAllCoursesQuery({}, {refetchOnMountOrArgChange:true});
//   const [editCourse , {isSuccess , error}] = useEditCourseMutation();
//   const editCourseData = data && data.courses?.find((i:any)  => i._id === id)
//   useEffect(() => {
//     if(isSuccess){
//       toast.success("Course edited successfully")
//       redirect("/admin/all-courses")
//     }
//    if(error){
//     if("data" in error){
//       const errorMsg = error as any;
//       toast.error(errorMsg.data.msg)
//       }
//    }
//   }, [isLoading , isSuccess , error])
  
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     if(editCourseData){
//       setCourseInfo({
//         name: editCourseData.name,
//         description: editCourseData.description,
//         price: editCourseData.price,
//         estimatedPrice:editCourseData.estimatedPrice,
//         tags: editCourseData.tags,
//         level: editCourseData.level,
//         thumbnail: editCourseData.thumbnail,
//         demoUrl:editCourseData.demoUrl,
//       })
//       setBenefits(editCourseData.benefits),
//       setPreRequisites(editCourseData.preRequisites),
//       setCourseContentData(editCourseData.courseData)



//     }
//     }, [editCourseData])
  

//   const [courseInfo, setCourseInfo] = useState({
//     name: "",
//     description: "",
//     price: "",
//     estimatedPrice: "",
//     tags: "",
//     level: "",
//     demoUrl: "",
//     thumbnail: "",
//   });

//   const [benefits, setBenefits] = useState<{ title: string }[]>([{
//     title: "",
//   }]);
//   const [preRequisites, setPreRequisites] = useState<{ title: string }[]>([{
//     title: "",
//   }]);

//   const [courseContentData, setCourseContentData] = useState([
//     {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: "Untitled Section",
//       links: [
//         {
//           title: "",
//           url: "",
//         },
//       ],
//       suggestion: "",
//     },
//   ]);

//   const [courseData, setCourseData] = useState({});


//   const handleSubmit = async () => {
//     //formated benifits array 
//     const formattedBenefits = benefits.map((benefit) => ({title: benefit.title }));
//     //formated preRequisites array
//     const formattedpreRequisites = preRequisites.map((prerequisite) => ({title: prerequisite.title }));
//     //formated courseContentData array
//     const formattedCourseContentData = courseContentData.map((courseContent) => ({
//       videoUrl: courseContent.videoUrl,
//       title: courseContent.title,
//       description: courseContent.description,
//       videoSection: courseContent.videoSection,
//       links: courseContent.links.map((link) => ({ title: link.title, url: link.url })),
//       suggestion: courseContent.suggestion,
//     }));

//     //prepare our data object
//     const data = {
//       name: courseInfo.name,
//       description: courseInfo.description,
//       price: courseInfo.price,
//       estimatedPrice:courseInfo.estimatedPrice,
//       tags: courseInfo.tags,
//       level: courseInfo.level,
//       thumbnail: courseInfo.thumbnail,
//       demoUrl:courseInfo.demoUrl,
//       totalVideos: courseContentData.length,
//       benefits: formattedBenefits,
//       preRequisites: formattedpreRequisites,
//       courseData: formattedCourseContentData,
//     };
//     setCourseData(data)
   
//   };
//   const handleCourseCreate =async (e:any) => {
//     const data = courseData;
//     await editCourse({id: editCourseData?._id, data}); 
//   }


//   return (
//     <div className="w-full flex min-h-screen">
//       <div className="w-[80%]">
//         {active === 0 && (
          
//           <CourseInformation 
//           courseInfo = {courseInfo}
//           setCourseInfo = {setCourseInfo}
//           active = {active}
//           setActive = {setActive}
//           />
//         )
//         }
//         {active === 1 && (
          
//           <CourseData 
//           benefits={benefits}
//           setBenefits={setBenefits}
//           preRequisites={preRequisites}
//           setPreRequisites={setPreRequisites}
//           active = {active}
//           setActive = {setActive}
//           />
//         )
//         }
//         {active === 2 && (
          
//           <CourseContent 
//           active = {active}
//           setActive = {setActive}
//           courseContentData={courseContentData}
//           setCourseContentData={setCourseContentData}
//           handleSubmit={handleSubmit}
          
//           />
//         )
//         }
//         {active === 3 && (
          
//           <CoursePreview 
//           active = {active}
//           setActive = {setActive}
//           courseData={courseData}
//           handleCourseCreate={handleCourseCreate}
//           isEdit = {true}
          
//           />
//         )
//         }
        
        
//       </div>
//       <div className="w-[20%] mt-[100px] fixed z-[-1]  top-18px right-0">
//         <CourseOptions active = {active} setActive={setActive}/>
//       </div>
//     </div>
//   );
// };

// export default EditCourse;


import { useEffect, useState } from "react";
import CourseInformation from  './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
};

const EditCourse = ({ id }: Props) => {
  const router = useRouter();
  const { isLoading, data } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const editCourseData = data?.courses?.find((course: any) => course._id === id);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState<{ title: string }[]>([{ title: "" }]);
  const [preRequisites, setPreRequisites] = useState<{ title: string }[]>([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail,
      });
      setBenefits(editCourseData.benefits || [{ title: "" }]);
      setPreRequisites(editCourseData.preRequisites || [{ title: "" }]);
      setCourseContentData(editCourseData.courseData || []);
    }
  }, [editCourseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course edited successfully");
      router.push("/admin/all-courses");
    }
    if (error && "data" in error) {
      const errorMsg = error as any;
      toast.error(errorMsg.data.msg);
    }
  }, [isSuccess, error]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((b) => ({ title: b.title }));
    const formattedpreRequisites = preRequisites.map((p) => ({ title: p.title }));
    const formattedCourseContentData = courseContentData.map((c) => ({
      videoUrl: c.videoUrl,
      title: c.title,
      description: c.description,
      videoSection: c.videoSection,
      links: c.links.map((l) => ({ title: l.title, url: l.url })),
      suggestion: c.suggestion,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      thumbnail: courseInfo.thumbnail,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      preRequisites: formattedpreRequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseEdit = async () => {
    const data = courseData;
    await editCourse({ id: editCourseData?._id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            preRequisites={preRequisites}
            setPreRequisites={setPreRequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseEdit}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] fixed z-[-1]  top-18px right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
