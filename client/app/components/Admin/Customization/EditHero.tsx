import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'

type Props = {}

const EditHero = (props: Props) => {
    const [image ,setImage] = useState("");
    const [title ,setTitle] = useState("");
    const [subTitle ,setSubTitle] = useState("");
    const {data} =  useGetHeroDataQuery("Banner" ,{ refetchOnMountOrArgChange:true});
    useEffect(()=>{

      if(data){
        setTitle(data?.layout?.banner.title);
        setSubTitle(data?.layout?.banner.subTitle);
        setImage(data?.layout?.banner?.image?.url)
      }

    },[data])
  return (
    <div>EditHero</div>
  )
}

export default EditHero