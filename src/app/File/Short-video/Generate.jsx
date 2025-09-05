
"use client"
import React from 'react'
import { useRef } from 'react'



export default  function Generate({send_text}) {

const text_ref= useRef()

  return (
  <div className="bg-white rounded-xl gap-y-4 flex-col flex flex-[1] p-4">
        <textarea 
        ref={text_ref}
        className=" w-full rounded-md text-sm  flex-[3]">
    
        </textarea>
        <button 
        onClick={()=> send_text(text_ref.current)}
        className =" text-sm hover:bg-gray-400 text-white   w-full h-6  rounded-md bg-[#A29BFE]" >
      Find a store
        </button>
      </div>
  )
}
