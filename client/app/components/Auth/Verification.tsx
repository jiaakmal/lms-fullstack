import React, { useState, useRef, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc"
import { styles } from "../../styles/style"
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';


type Props = {
    setRoute: (route: string) => void;
}
type verifyNumber = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,

}

const Verification = ({ setRoute }: Props) => {
    const { token } = useSelector((state: any) => state.auth);
    console.log("Token from Redux:", token);

    const [activation, { isSuccess, error }] = useActivationMutation();
     const [inValidError, setInValidError] = useState(false);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Account Activated Successfully");
            setRoute("Login")
        }
        if (error) {
            console.log("Activation Error:", error); // Debugging
            if ("data" in error) {
                const errorData = error as any;
                setInValidError(true);
                toast.error(errorData.data.message);
            }
            else{
                toast.error("Something went wrong while activating account");
            }

        }
    }, [isSuccess, error]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });
    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        console.log("Verification Number:", verificationNumber); // Debugging
        if (verificationNumber.length < 4) {
         setInValidError(true);
            toast.error("Please enter the OTP");
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber
        });


    }
    const handleInputChange = (index: number, value: string) => {
  
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        console.log("Updated Verify Number:", newVerifyNumber); // Debugging

        setVerifyNumber(newVerifyNumber);
        if (value === "" && index < 3) {
            inputRefs[index + 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div>
            <h1 className={`${styles.title}`}>
                Verify your account
            </h1>
            <div className='w-full flex items-center justify-center mt-2'>
                <div className='w-[80px] h-[80px] rounded-full flex justify-center items-center bg-[#497DF2] '>
                    <VscWorkspaceTrusted size={40} className='text-white' />
                </div>
            </div>
            <br />
            <br />
            <div className='m-auto flex items-center justify-around'>
                {

                    Object.keys(verifyNumber).map((key, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="number"
                            maxLength={1}
                            value={verifyNumber[key as keyof verifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center justify-center text-black dark:text-white text-[18px] font-Poppins outline-none text-center ${inValidError
                                ? "shake border-red-500"
                                : "dark:border-white border-[#0000004a]"
                                }`}
                            placeholder="•"
                        />
                    ))}
            </div>
            <br />
            <br />
            <div className='w-full flex items-center'>
                <button className={`${styles.button} `} onClick={verificationHandler}>
                    Verify OTP
                </button>

            </div>
            <br />
            <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                Go back to sign in ?<span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => { setRoute("Login") }}>Sign in </span>
            </h5>




        </div>
    )
}

export default Verification;