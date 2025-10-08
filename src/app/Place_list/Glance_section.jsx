import React from 'react'
import { useEffect,useState } from 'react';

import { FaSpinner } from "react-icons/fa";
import { useMap } from '@vis.gl/react-google-maps';
import { useDispatch, UseDispatch } from 'react-redux';

import {locality_place_change} from '../Redux/store'

export default function Glance_section({city_data}) {
  const dispatch= useDispatch()

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(()=>{
const fetchPhoto = async () => {
  const res = await fetch(`/api/google-place?city=${city_data.city}`);
 
  const data = await res.json();

      setImages(data);
    setLoading(true)
};

  //fetchPhoto()


   },[])




  const click_border= function(){
  
    dispatch(locality_place_change({
     
     place:city_data.place_id,
     location:city_data.location
    
  }))
    
  }










  return (
    <div
    onClick={click_border}
    className="relative w-full h-42 flex flex-col bg-white rounded-md shadow-md border border-gray-200 hover:shadow-lg transition overflow-hidden cursor-pointer group">
      {/* 썸네일 */}
      <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden">
      {
        !loading &&  <FaSpinner className="animate-spin text-green-500 text-2xl" ></FaSpinner>
      }
        <img
          src={city_data.image}
          alt="Shinjuku"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="px-3 py-3">
        <p className="text-xs text-green-600 font-medium">
          {city_data.tagging}
        </p>
        <p className="text-sm pt-1 font-semibold text-gray-800">{city_data.city}</p>
      </div>

      {/* Hover 시 설명 오버레이 */}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs leading-relaxed">

        {city_data.description}
        </p>
      </div>
    </div>
  );
}
