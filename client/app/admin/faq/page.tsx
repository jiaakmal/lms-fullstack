'use client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/AdminSidebar'
import Heading from '@/app/utils/Heading'
import Faq from '../../components/Admin/Customization/Faq'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditFAQ from '../../components/Admin/Customization/Faq'


type Props = {}

const page = ({params}:any) => {
    const id= params?.id;
  return (
    <div>
        <Heading
        title="ELearning -Faq- Admin" 
        description="It is a platform for students to learn and share knowledge."
        keywords="mern , learning , jawaria , web development, frontend , backend "
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
               <AdminSidebar/>
            </div>
            <div className="w-[85%]">
                <DashboardHeader/>
                <EditFAQ />
            </div>
        </div>
            
    </div>
  )
}

export default page