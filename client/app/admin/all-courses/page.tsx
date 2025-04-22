'use client'
import React from 'react'

import AdminProtected from '../../hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import DashboardHero from '@/app/components/Admin/DashBoardHero'
import AllCourses from '../../components/Admin/Course/AllCourses'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning -All courses - Admin"
          description="eLearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />

        {/* Fix layout container */}
        <div className="flex h-screen dark:text-white text-black">
          {/* Sidebar */}
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full px-4">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page;
