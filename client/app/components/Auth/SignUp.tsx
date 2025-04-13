'use client'
import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import{AiOutlineEye , AiOutlineEyeInvisible,AiFillGithub} from "react-icons/ai"
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import {FcGoogle} from "react-icons/fc"
import {styles} from "@/app/styles/style"



import toast from 'react-hot-toast'

import { useSelector } from 'react-redux'
import { useRegisterMutation } from '@/redux/features/auth/authApi'


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const LoginSchema = Yup.object().shape({
    name:Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().min(8, "Password is too short").required("Please enter your password"),
})

const SignUp= ({setRoute,setOpen}: Props) => {
    const [show, setShow] = useState(false);
    const [register , { isSuccess, data, isError, error }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess && data) {
            const message  = data?.message || "Register successfully";
            toast.success(message);
            setRoute("Verification");

        }
        if (error) {
            console.log("Error", error);
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "Something went wrong");
            }
            else {
                toast.error("Something went wrong");
            }
        }

    }, [isSuccess, error , isError]);
    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            await register(values);// values = { email: string, password: string }
          }
          
    });

    const {errors, touched, values, handleChange, handleSubmit} = formik
    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Join with ELearning

            </h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                <label
                    htmlFor='name'
                    className={`${styles.label}`}
                >Enter your name:</label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
                    placeholder='Enter your email' />
                {errors.name && touched.name && (<span className='text-red-500 pt-2 block'>{errors.name}</span>)}
                </div>
            
                <div className="w-full mt-5 relative mb-1">
                <label
                    htmlFor='email'
                    className={`${styles.label}`}
                >Enter your email:</label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                    placeholder='Enter your email' />
                {errors.email && touched.email && (<span className='text-red-500 pt-2 block'>{errors.email}</span>)}
                </div>
                <div className="w-full mt-5 relative mb-1">

                    <label
                        htmlFor='password'
                        className={`${styles.label}`}
                    >Enter your password:</label>
                    <input
                        id='password'
                        type={show ? "text" : "password"}
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
                    />
                    {!show ?
                        <AiOutlineEyeInvisible size={20} className="absolute right-2 bottom-3 cursor-pointer z-1" onClick={() => setShow(true)} /> :
                        <AiOutlineEye size={20} className="absolute right-2 bottom-3 z-1 cursor-pointer" onClick={() => setShow(false)} />}
                    {errors.password && touched.password && (<span className='text-red-500 pt-2 block'>{errors.password}</span>)}
                </div>
                <div className='mt-5 w-full'>
                    <input
                        type="submit"
                        value="Sign In "
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Or join us
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle
                
                        size={30} className="cursor-pointer mr-2" />
                    <AiFillGithub
                        
                        size={30} className="cursor-pointer ml-3" />


                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Already  have an account? {" "}
                    <span className='pl-1 cursor-pointer text-[#2190ff]' onClick={() => setRoute("Login")}>Sign in</span>
                </h5>
            </form>
            <br />
        </div>

    );
}
     
export default SignUp;
