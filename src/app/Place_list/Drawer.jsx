import { Children, useState } from "react";
import { useDispatch } from "react-redux";
import Inner_compont from "./Inner_compont";
export default function CategoryTabs({children,tabs,change_category }) {

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  


 

  return (
    <div className="flex   border-gray-200 w-full flex-col ">
        <div className="h-16 flex overflow-x-auto overflow-y-hidden no-scrollbar w-full">
      {tabs.map((tab,index) => (
        <button
          key={tab.id}
          onClick={() => {setActiveTab(tab.id)
             //dispatch(index)
             // 여기에서 몇일인지 뽑아서 보내주면 됨 

             change_category(tab.id)
          }}
          className={`relative px-4  w-20   text-gray-600 text-xs transition-colors duration-200
            ${activeTab === tab.id ? "text-[#2BB67E]" : "hover:text-gray-800"}`}
        > 
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2BB67E] rounded-t-lg"></span>
          )}
        </button>
      ))}
            </div>


     {children}    

    
   
 
    </div>
    
  );
}