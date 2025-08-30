import React from 'react'

export default function Find_list() {
      const [open, setOpen] = React.useState(false);
  return (
     <div className="min-w-0  flex-[3] bg-pink-200 p-4">
       <p className={open ? "whitespace-normal" : "truncate"}>
        아주아주아주아주 길어진 문장입니다. 버튼을 누르면 전체 보이도록 처리할 수 있어요.
      </p>
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-500 text-sm mt-1"
      >
        {open ? "접기" : "전체 보기"}
      </button>
  </div>
  )
}
