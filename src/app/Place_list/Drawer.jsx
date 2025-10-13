import { Children, useState } from "react";

import Inner_compont from "./Inner_compont";
export default function CategoryTabs({Children,tabs,change_category }) {

  const [activeTab, setActiveTab] = useState(tabs[0].label);
  


 

  return (
    <div className="flex h-full  border-gray-200 w-full flex-col ">
        <div className="h-20 flex overflow-x-auto overflow-y-hidden no-scrollbar w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {setActiveTab(tab.id)

             change_category()
          }}
          className={`relative px-4 py-1 w-20   text-gray-600 text-xs transition-colors duration-200
            ${activeTab === tab.id ? "text-[#2BB67E]" : "hover:text-gray-800"}`}
        > 
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2BB67E] rounded-t-lg"></span>
          )}
        </button>
      ))}
            </div>
    <div className="w-full flex flex-col  min-w-0 ">
      {Children}

    </div>
     
    
    </div>
  );
}
