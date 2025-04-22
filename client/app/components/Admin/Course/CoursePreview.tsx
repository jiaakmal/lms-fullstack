import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import Rating from "../../../utils/Ratings";
import { styles } from "@/app/styles/style";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit
}: Props) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
   
  const prevButton = ()=>{
    setActive(active - 1);
  }
  const createCourse = ()=> {
    handleCourseCreate();
  }

  return (
    <div className="w-[80%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-2xl">
            {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} my-3 !w-[180px] font-Poppins cursor-not-allowed !bg-[crimson]`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Discount Code"
            className={`${styles.input} ml-3 1500px:!w-[50%] 1100px:w-[60%] !mt-0`}
          />
          <div
            className={`${styles.button} ml-4 my-3 font-Poppins cursor-pointer !w-[120px] `}
          >
            Apply
          </div>
        </div>
        <div className="pb-1">. Source code inculded</div>
        <div className="pb-1">. Full lifetime access</div>
        <div className="pb-1">. Certificate on complete</div>
        <div className="pb-3 800px:pb-1">. Premium support </div>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-2xl font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Rating rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-2xl font-Poppins font-[600]">
            What will you learn from this course ?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="flex w-full py-2 800px:items-center" key={index}>
            <div className="w-[15px] mr-1">
              <IoIosCheckmark size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-2xl font-Poppins font-[600]">
            What are the prerequisites for starting this course ?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="flex w-full py-2 800px:items-center" key={index}>
            <div className="w-[15px] mr-1">
              <IoIosCheckmark size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}

        <div className="w-full ">
          <h1 className="text-2xl font-Poppins font-[600]">Course Details</h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ">{courseData?.description}</p>
        </div>
        <br/><br/>
      </div>
      <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => createCourse()}
                >
                    {
                      isEdit? "Update" : "Create"
                    }
                </div>
            </div>
    </div>
  );
};

export default CoursePreview;
