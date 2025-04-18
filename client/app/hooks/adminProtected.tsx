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
  const isAdmin  = user?.role === "admin"
  const router = useRouter();

  useEffect(() => {
    // Jab component mount ho, tab check karo user admin hai ya nahi
    if (!isAdmin) {
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
