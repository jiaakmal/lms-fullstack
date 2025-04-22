'use client'
import React from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import Heading from '../../../utils/Heading'
import EditCourse from '../../../components/Admin/Course/EditCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'


type Props = {}

const page = ({params}:any) => {
    const id= params?.id;
  return (
    <div>
        <Heading
        title="ELearning -EditCourse- Admin" 
        description="It is a platform for students to learn and share knowledge."
        keywords="mern , learning , jawaria , web development, frontend , backend "
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
               <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHeader/>
                <EditCourse id={id}/>
            </div>
        </div>
            
    </div>
  )
}

export default page