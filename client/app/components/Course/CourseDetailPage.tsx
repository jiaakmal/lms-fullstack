'use client'
import React, {useState} from 'react'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseDetails from './CourseDetails';

type Props = {
    id:string;
}

const CourseDetailPage = ({id}: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState('Login');
    const {data, isLoading} = useGetCourseDetailsQuery(id);

  return (
    <>
    {isLoading ? (
        <Loader/>
    ):(
        <div>
            <Heading
                title={`${data?.course?.name} || "ELearning "`}
                description={`${data?.course?.description} || "ELearning "`}
                keywords={`${data?.course?.tags}`}/>
            <Header
                setOpen={setOpen}
                open={open}
                setRoute={setRoute}
                route={route}
                activeItem={1}
                />
            <CourseDetails data = {data.course}/>    
        </div>
    )}
    </>
    )
}

export default CourseDetailPage