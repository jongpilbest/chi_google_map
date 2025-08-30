import React from 'react'
import Image from 'next/image'
import Image_1 from '../../image/1847636.jpg'
import Image_2 from '../../image/1850806.jpg'
import Image_3 from '../../image/1853308.jpg' 

export default function FInd_list_inner() {
  return (
    <div className='w-full p-3  min-w-[100%] '>

        <div className='w-[44%] bg-gray-100 h-full p-3 gap-2 flex justify-between items-center'>
         <div className='flex-[1] h-[85%]  bg-white'>
            <Image className='h-full' src={Image_1}></Image>
         </div>
         <div className='flex-[1] h-[85%]  bg-white'>
            <Image  className='h-full' src={Image_2} ></Image>
         </div>
         <div className='flex-[1] h-[85%]  bg-white'>
            <Image   className='h-full'  src={Image_3}></Image>
         </div>
        </div>
    </div>
  )
}
