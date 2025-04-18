import React from 'react';  
import Heading from '../utils/Heading';  
import AdminSidebar from '../components/Admin/AdminSidebar'; 
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from '../components/Admin/DashBoardHero'
type Props = {};  

const Page = (props: Props) => {  
    return (  
        <div>  
            <AdminProtected>
            <Heading  
                title="ELearning - Admin"  
                description="eLearning is a platform for students to learn and get help from teachers"  
                keywords="Programming,MERN,Redux,Machine Learning"  
            />  
            <div className="flex h-[200vh] dark:text-white text-black">  
                <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />  
                </div>  
             
            </div>  
            <div className="w-[85%]">  
              <DashboardHero/>
            </div>  
            </AdminProtected>
        </div>  
    );  
};  

export default Page;  