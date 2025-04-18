"use client";
import { styles } from "@/app/styles/style";
import React, { useState } from "react";
type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log("Submit fired ✅");
    console.log("Current step:", active);
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e:any)=>{
    e.preventDefault();
    setDragging(true);

  }
  const handleDragLeave =(e:any)=>{
    e.preventDefault();
    setDragging(false);


  }
  const handleDrop =(e:any)=>{
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit = {handleSubmit}>
        <label htmlFor="" className={`${styles.label}`}>
          Course Name
        </label>
        <input
          id="name"
          name="name"
          type="name"
          required
          value={courseInfo.name}
          onChange={(e) =>
            setCourseInfo({ ...courseInfo, name: e.target.value })
          }
          className={` ${styles.input}`}
          placeholder="MERN stack LMS course with next-js 15"
        />
        <br />
        <div className="mt-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description{" "}
          </label>
          <textarea
            id=" "
            name=""
            cols={30}
            rows={10}
            required
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={` ${styles.input} !h-min !py-2 `}
            placeholder="Write something amazing........"
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="price" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              id="price"
              required
              name=""
              type="number"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={` ${styles.input}`}
              placeholder="29"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="eprice" className={`${styles.label}`}>
              Estimated Price(optional)
            </label>
            <input
              id="eprice"
              name=""
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={` ${styles.input}`}
              placeholder="21"
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <label htmlFor="tags" className={`${styles.label}`}>
            Course tags
          </label>
          <input
            id="tags"
            name=""
            required
            type="text"
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className={` ${styles.input}`}
            placeholder="21"
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              id="level"
              name=""
              type="number"
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={` ${styles.input}`}
              placeholder="Biggner/Intermidiate/Expert"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="url" className={`${styles.label}`}>
              Demo url
            </label>
            <input
              id="demoUrl"
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={` ${styles.input}`}
              placeholder="werf1245"
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            id="file"
            name="file"
            accept="image/*"
            type="file"
            required
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file" className={`
          w-full min-h-[10vh] dark:border-white border=[#00000026] p-3 border flex items-center justify-center 
          ${dragging ? "bg-blue-500" : "bg-transparent"}
            `} onDragOver = {handleDragOver} onDragLeave= {handleDragLeave}  onDrop = {handleDrop}
             >
                {
                    courseInfo.thumbnail ? (
                        <img src={courseInfo.thumbnail} alt=""  className = " max-h-full w-full object-cover"/>
                    ):(
                        <span className = "text-black dark:text-white">Drag and drop your thumbnail here or click to browse</span>
                    )
                }
          
          </label>
        </div>
        <br/>
        <div className="w-full flex items-center justify-end ">
          <input type='submit'
          value='Next'
          className="w-full 800px:w-[180px] h-[40px] text-center rounded mt-8 cursor-pointer bg-[#37a39a] text-[#fff]"
          />
        </div>
        <br/>
        <br/>
      </form>
    </div>
  );
};

export default CourseInformation;
