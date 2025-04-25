'use client'
import React, {useState} from 'react'
import Heading from "./utils/Heading"
import Header from './components/Header'
import Hero from './components/Route/Hero'
import Courses from './components/Courses/Courses'

type Props = {
  
}

const page = (props: Props) => {
  
  const [open , setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route , setRoute] = useState("Login");
  return (
    <div>
      <Heading title="Learning With Jawaria" description="It is a platform for students to learn and share knowledge." keywords="mern , learning , jawaria , web development, frontend , backend "/>
      <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute = {setRoute}/>
      <Hero/>
      <Courses/>
    </div>
  )
}

export default page