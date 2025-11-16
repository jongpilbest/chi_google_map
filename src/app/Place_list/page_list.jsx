import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Glance_section from './Glance_section';
import { FaArrowLeft } from "react-icons/fa6";
import Drawer from './Drawer'
import { useSelector ,shallowEqual} from 'react-redux';
import Inner_compont from './Inner_compont';
import TOKYO_AREAS from '../Data/paris_Data'
  const tabs = [
    { id: "Transportation", label: "Transportation" },
    { id: "Accommodation", label: "Accommodation" },
    { id: "Food and Beverage", label: "Food and Beverage" },
     { id: "Shopping", label: "Shopping" },
       { id: "Attraction", label: "Attraction" },
  ];




export default function page_list() {
  
  const comment= useSelector((state)=>state.data_store.location_data,shallowEqual) 
 
 const[filter_comment, set_filter_comment]=useState([]);



 const[setting,Setsetting]=useState('Glance');

  const [modal,setmodal]=useState({
    modal:false,
    name:''
  });
 

  function modal_change(name){
    console.log(name)
  
    setmodal({
      modal:true,
      name:name
    })
    const comment_filter=Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.city==name)    
    set_filter_comment(comment_filter)
  }

  function Drawer_change(activeTab){
  
    
    const comment_filter=comment&&Object.values(comment).map(arr => arr[0]).flat().filter((el)=>el.category==activeTab)   
    console.log(Object.values(comment).map(arr=>arr[0]))
    set_filter_comment(comment_filter)

  }

  
  
  return (
    <div className="flex flex-2 flex-col px-8 h-full overflow-hidden relative">

      <div className="pt-5 pb-3 flex gap-10 items-center border-b border-gray-200">
       {modal.modal && (
  <div className="absolute inset-0 z-50 bg-white flex flex-col px-10 rounded-md">
    <div className="w-full h-full shadow-xl flex flex-col">

      <header className="h-14 bg-gray-100 flex justify-between items-center px-3 border-b border-gray-200">
        <p className="font-bold text-sm">{modal.name}</p>
        <button
          onClick={() =>
            setmodal({
              modal: false,
              name: '',
            })
          }
          className="bg-[#47D6A2] p-1 rounded-md"
        >
          <FaArrowLeft className="text-white" />
        </button>
      </header>

  
      <div className="flex-1 overflow-y-auto p-3">
        { filter_comment.map((El) => (
          <Inner_compont key={El.describe} data={El} />
        ))}
      </div>
    </div>
  </div>
)}


        <p className="text-md font-bold">Place</p>
       {/*
        <div className="flex items-center flex-1 bg-gray-100 shadow rounded-md px-3 py-1">
          <input
            placeholder="Find Place"
            className="text-xs h-6 px-2 w-full text-gray-800 bg-transparent outline-none placeholder-gray-400"
          />
          <button className="text-white w-5 h-5 flex justify-center items-center hover:text-green-700 transition-colors bg-[#47D6A2] rounded-md">
            <CiSearch className="text-sm" />
          </button>
        </div>
       */}
      </div>


   
      <div className="flex w-full gap-8 justify-between py-5">
        <button 
        onClick={()=>Setsetting('Glance')}
       className={`flex-1 py-1.5 ${
  setting === 'Glance' ? 'bg-[#47D6A2] text-white' : 'bg-gray-100 text-gray-400'
} text-sm  rounded-md hover:bg-green-600 hover:text-white`}
       >
          Glance
        </button>
        <button 
         onClick={()=>Setsetting('Concise')}
       className={`flex-1 py-1.5 ${
  setting === 'Concise' ? 'bg-[#47D6A2] text-white' : 'bg-gray-100 text-gray-400'
} text-sm  rounded-md hover:bg-green-600 hover:text-white`}
       >
          Concise
        </button>
        
      </div>
   



{/* 아래 콘텐츠 영역 */}
<div className="flex flex-1 h-full min-h-0 w-full">
  {/* 왼쪽: Glance */}
  {setting === 'Glance' && (
    <div className="flex-1 h-full min-h-0 min-w-0 overflow-y-auto grid grid-cols-2 gap-4 pb-5">
      { TOKYO_AREAS.map((el, index) => (
        <Glance_section
          key={el + index}
          city_data={el}
          modal_change={(el) => modal_change(el)}
        />
      ))
      }
    </div>
  )}

  {/* 오른쪽: Concise */}
  {setting === 'Concise' && (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto bg-white">
      <Drawer change_category={(e)=>Drawer_change(e)}     tabs={tabs} >
         {
        filter_comment.map((El)=>
              <Inner_compont key={El.describe}  data={El} />
        )
       }
        </Drawer>
    </div>
  )}
</div>


     
    </div>
  );
}