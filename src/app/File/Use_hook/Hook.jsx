import React, { use } from 'react'
import { useEffect,useState } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import {Loading_state} from   '@/app/Redux/store';

export default function UseHook() {
 const youtube_link  = useSelector((state) => state.url.Loading_state);
 

  return (

    <>
        {youtube_link && <AiOutlineLoading3Quarters className="animate-spin" >
            </AiOutlineLoading3Quarters>}

    </>

  )
}
