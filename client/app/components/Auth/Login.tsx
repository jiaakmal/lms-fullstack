'use client'
import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FcGoogle } from "react-icons/fc"
import { styles } from "@/app/styles/style"
import { useLoginMutation } from '@/redux/features/auth/authApi'
import {signIn} from  "next-auth/react";
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().min(8, "Password is too short").required("Please enter your password"),
})

const Login = ({ setRoute, setOpen }: Props) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, data, isError, error }] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            await login(values); // values = { email: string, password: string }
        }

    });
    useEffect(() => {
        if (isSuccess && data) {
            toast.success("Login successful ");
            setOpen(false);


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

    }, [isSuccess, error]);

    const { errors, touched, values, handleChange, handleSubmit } = formik
    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Login with ELearning

            </h1>
            <form onSubmit={handleSubmit}>
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
                <div className="w-full mt-5 relative mb-1">
                    <label
                        htmlFor='email'
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
                        value="Login"
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Or join us
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle

                        size={30} className="cursor-pointer mr-2" onClick={() => signIn("google")} />
                    <AiFillGithub

                        size={30} className="cursor-pointer ml-3" onClick={() => signIn("github")} />


                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Not have any account? {" "}
                    <span className='pl-1 cursor-pointer text-[#2190ff]' onClick={() => setRoute("Sign-Up")}>Sign up</span>
                </h5>
            </form>
            <br />
        </div>

    );
}

export default Login;
