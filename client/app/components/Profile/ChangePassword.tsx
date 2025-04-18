import {styles} from '@/app/styles/style'  
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { useState , useEffect} from 'react'; 
import { toast } from 'react-hot-toast'; 

const ChangePassword: React.FC = () => {  
  const [oldPassword, setOldPassword] = useState('');  
  const [newPassword, setNewPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [updatePassword , {isSuccess , error}] = useUpdatePasswordMutation();


  const passwordChangeHandler =async (e: any) => {  
    e.preventDefault();  
    // Perform password update logic here, e.g., API call  
    if (newPassword === confirmPassword) {  
      await updatePassword({oldPassword , newPassword})  ;
    
    } else {  
      toast.error('Passwords do not match.');  
    }  
  };  
  useEffect(() => {
    if(isSuccess){
      toast.success("Password updated successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess , error])

  return (  
    <div className="w-full p-7 px-8 px-800px">  
      <h2 className="block text-[25px]  font-Poppins text-center font-[500] text-[#fff]  dark:text-white text-black pb-2">  
        Change Password  
      </h2>  
      <form onSubmit={passwordChangeHandler} aria-required>  
        <div className="flex flex-col items-center">  
          <div className="w-[100%] 800px:w-[60%] mt-5">  
            <label className="block pb-2  dark:text-white text-black">Enter your old password</label>  
            <input  
              className={styles.input}  
              type="password"  
              value={oldPassword}  
              onChange={(e) => setOldPassword(e.target.value)}  
              required  
            />  
          </div>  
          <div className="w-[100%] 800px:w-[60%] mt-5">  
            <label className="block pb-2  dark:text-white text-black">Enter your new password</label>  
            <input  
              className={styles.input}  
              type="password"  
              value={newPassword}  
              onChange={(e) => setNewPassword(e.target.value)}  
              required  
            />  
          </div>  
          <div className="w-[100%] 800px:w-[60%] mt-5">  
            <label className="block pb-2  dark:text-white text-black">Confirm your new password</label>  
            <input  
              className={styles.input}  
              type="password"  
              value={confirmPassword}  
              onChange={(e) => setConfirmPassword(e.target.value)}  
              required  
            />  
          </div>  
          <button type="submit" className="mt-5 bg-blue-500 text-white px-4 py-2 rounded">  
            Update Password  
          </button>  
        </div>  
      </form>  
    </div>  
  );  
};  

export default ChangePassword;  