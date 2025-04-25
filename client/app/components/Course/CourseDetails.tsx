import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { MdOutlineSchool, MdOutlineStar } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import CoursePlayer from '@/app/utils/CoursePlayer';
import CourseContentList from '../Course/CourseContentList';
import  Rating  from '../../utils/Ratings';

interface Props {
  data: any;
}

const CourseDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountedPercentage = discountPercentage.toFixed(0);
  const isPurchased = user && user?.courses?.find((course: any) => course._id === data?._id);

  const handleOrder = () => {
    console.log("Order");
  };

  return (
    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row gap-6 p-5 800px:p-8">
      {/* Left: Scrollable Content */}
      <div className="w-full lg:w-2/3 space-y-10 overflow-y-auto max-h-[calc(100vh-40px)] pr-2">
        {/* title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{data.name}</h1>
          <Rating  rating={data.rating} />  {data.reviews}
        </div><br/><br/>

        {/* Course Overview */}
       <CourseContentList data = {data.courseData}/>

        {/* Benefits */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 shadow space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">What you'll learn</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
            {data.benefits.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        </div>

        {/* Pre-requisites */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-5 shadow space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Pre-requisites</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
            {data.preRequisites.map((item: any) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Student Reviews</h3>
          {data.reviews.length > 0 ? (
            <div className="space-y-4">
              {data.reviews.map((review: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-[#1e1e1e]">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{review.user?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review this course!</p>
          )}
        </div>
        <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">{data.description}</p>
        </div>
      </div>
      <br/><br/>

      {/* Right: Thumbnail + CTA */}
      <div className="w-full 800px:w-[35%] relative ">
        <div className="sticky top-[100px] left-0 z-50">
          <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
          <div className="p-5 space-y-3">
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="bg-primary text-white px-2 py-1 rounded-md font-medium">{data.level}</span>
              <span className="text-primary">{data.tags}</span>
              <div className="flex items-center gap-1">
                <MdOutlineStar size={16} /> <span>{data.rating} Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <PiStudentBold size={16} /> <span>{data.purchased} Students</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mt-3">
              <h2 className="text-lg font-bold text-primary">{data.price > 0 ? `$${data.price}` : 'Free'}</h2>
              <span className="line-through text-gray-500 dark:text-gray-400">${data.estimatedPrice}</span>
              <span className="text-green-500 font-medium text-sm">({discountedPercentage}% OFF)</span>
            </div>

            <button
              onClick={handleOrder}
              className="w-full mt-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
            >
              {isPurchased ? 'Go to Course' : 'Enroll Now'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
