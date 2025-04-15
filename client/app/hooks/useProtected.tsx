// import {redirect} from 'next/navigation';
// import userAuth from './userAuth';


// interface ProtectedProps {
//     children: React.ReactNode;
//     }

// export default function Protected({children}: ProtectedProps) {
//     // Check if the user is authenticated
//   const isAuthenticated = userAuth();
//   console.log("authenticated to see profile page ", isAuthenticated)
//     // If not authenticated, redirect to the login page
//     return isAuthenticated ?  children : redirect('/');
// }


"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader/Loader";
interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const [ready, setReady] = useState(false);
  const user = useSelector((state: any) => state.auth?.user);
  const router = useRouter();

  useEffect(() => {
    // Jab component mount ho, tab check karo user hai ya nahi
    if (!user || Object.keys(user).length === 0) {
      router.push("/"); // home page bhej do
    } else {
      setReady(true); // allow rendering
    }
  }, [user, router]);

  // Jab tak check complete nahi hoti, spinner dikhate hain
  if (!ready) {
    return (
      <Loader/>
    );
  }

  // Agar sab theek hai to children render karo (protected content)
  return <>{children}</>;
}
