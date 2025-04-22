import { styles } from '@/app/styles/style';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    preRequisites: { title: string }[];
    setPreRequisites: (preRequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData = ({
    benefits,
    setBenefits,
    preRequisites,
    setPreRequisites,
    active,
    setActive,
}: Props) => {
    const handleBenefitChange = (index: number, value: string) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: '' }]);
    };
    const handlepreRequisitesChange = (index: number, value: string) => {
      const updatedpreRequisites = [...preRequisites];
      updatedpreRequisites[index].title = value;
      setPreRequisites(updatedpreRequisites);
  };

  const handleAddpreRequisites = () => {
      setPreRequisites([...preRequisites, { title: '' }]);
  };
  const prevButton = () => {
    // Handle previous button click
    setActive(active - 1);
};

const handleOptions = () => {
    // Handle next button click
    if(benefits[benefits.length - 1].title !== ''  && preRequisites[preRequisites.length - 1].title !== ''){
      setActive(active + 1);
    }
    else{
      toast.error('Please fill all the fields');
    }

};

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit, index) => (
                    <input
                        type="text"
                        key={index}
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                <AiOutlinePlus onClick={handleAddBenefit}></AiOutlinePlus>
            </div>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the preRequisites for students in this course?
                </label>
                <br />
                {preRequisites.map((preRequisites, index) => (
                    <input
                        type="text"
                        key={index}
                        name="preRequisites"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        className={`${styles.input} my-2`}
                        value={preRequisites.title}
                        onChange={(e) => handlepreRequisitesChange(index, e.target.value)}
                    />
                ))}
                <AiOutlinePlus onClick={handleAddpreRequisites}></AiOutlinePlus>
            </div>
            <br/>
        <div className="w-full flex items-center justify-end ">
          <input type='submit'
          value='Next'
          className="w-full 800px:w-[180px] h-[40px] text-center rounded mt-8 cursor-pointer bg-[#37a39a] text-[#fff]"
          />
        </div>
        <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;