'use client'
import React ,{ useState} from "react"
import Heading from "./utils/Heading"
import Header from './components/Header'

const Page  = () => {

  const [open , setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading title="Learning With Jawaria" description="It is a platform for students to learn and share knowledge." keywords="mern , learning , jawaria , web development, frontend , backend "/>
      <Header open={open} setOpen={setOpen} activeItem={activeItem}/>
    </div>
  )
}

export default Page
