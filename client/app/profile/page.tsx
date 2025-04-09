'use client';
import React, { useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/Profile/Profil';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state: any) => state.auth);


  return (
    <Protected>
      <Heading
        title={`${user?.name} Profile`}
        description="It is a platform for students to learn and share knowledge."
        keywords="mern , learning , jawaria , web development, frontend , backend "
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Profile user = {user} />
    </Protected>
  );
};

export default Page;
