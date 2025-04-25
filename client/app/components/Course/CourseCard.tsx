import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Rating from '@/app/utils/Ratings';
import { AiOutlineUnorderedList } from 'react-icons/ai';

interface Props {
  item: any;
  isProfile?: boolean;
}

const CourseCard = ({ item, isProfile }: Props) => {
  return (
    <Link href={!isProfile ? `/courses/${item._id}` : `/course-access/${item._id}`}>
      <div className="w-full rounded-2xl overflow-hidden shadow-md dark:shadow-lg hover:shadow-lg transition-shadow duration-300 dark:bg-[#1e1e1e] bg-white border dark:border-gray-800 border-gray-200">
        {/* Image */}
        <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] 1000px:h-[260px] relative">
          <Image
            src={item.thumbnail.url}
            alt={item.title}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          <h3 className="text-lg 1000px:text-xl font-semibold text-black dark:text-white line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center justify-between text-sm 1000px:text-base">
            <Rating rating={item.rating} />
            <span className="text-gray-600 dark:text-gray-400">{item.purchased} Students</span>
          </div>
          <p className="text-sm 1000px:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-sm 1000px:text-base font-medium text-primary">
                {item.price > 0 ? `$${item.price}` : 'Free'}
              </span>
              {item.estimatedPrice && (
                <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                  ${item.estimatedPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <AiOutlineUnorderedList size={18} />
              <span>{item.courseData?.length || 0} Lectures</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
