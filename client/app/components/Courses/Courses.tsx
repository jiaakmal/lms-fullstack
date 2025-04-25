import { useGetAllUserCoursesQuery } from '@/redux/features/courses/coursesApi'
import React,{useEffect} from 'react'
import CourseCard from '../Course/CourseCard'

type Props = {

}

const Courses = (props: Props) => {
    const { data,isLoading} = useGetAllUserCoursesQuery({});
    const [courses, setCourses] = React.useState<any[]>([]);
    useEffect(() => {
     
            setCourses(data?.courses);
    }, [data])
    
  return (
    <div>
        <div className="w=[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-2xl 600px:text-3xl 600px:m-4 1000px:text-4xl font-semibold leading-tight tracking-tight dark:text-white text-black">
  Expand Your Career Opportunities<br className="hidden 1000px:block" />
  <span className="text-primary"> with Our Expert-Curated Courses</span>
</h1>
            <br/><br/>
            <div className="grid grid-cols-1 800px:grid-cols-3 gap-5">
                {
                    courses&& courses.map((item, index) => (
                        <>
                        <CourseCard key={index} item={item} />
                        </>
                    ))
                }
            </div><br/><br/>
        </div>
    </div>
  )
}

export default Courses