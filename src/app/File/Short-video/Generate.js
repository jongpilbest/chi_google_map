import React from 'react'

export default function Generate() {
  return (
  <div className="bg-white rounded-xl gap-y-4 flex-col flex flex-[1] p-4">
        <textarea className=" w-full rounded-md text-sm  flex-[3]">
    
        </textarea>
        <button  className =" text-sm text-white   w-full h-6  rounded-md" style={{ backgroundColor:'#7B7AE7'}}>
          Generate short version
        </button>
      </div>
  )
}
