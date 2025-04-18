import React from 'react'

type Props = {
    benefits : {title : string }[];
    setBenefits: (benifits : {title : string }[]) => void;
    prerequisites : {title : string }[];
    setPrerequisites: (prerequisites : {title : string }[]) => void;
    active : number;
    setActive : (active : number) => void;
}

const CourseData = ({benefits,setBenefits,prerequisites,setPrerequisites,active,setActive}: Props) => {
  return (
    <div>CourseData</div>
  )
}

export default CourseData