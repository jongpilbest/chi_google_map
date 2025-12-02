"use client";
import Link from "next/link";

export default function Intro() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex gap-8">
  
           <Link href="/Paris">
          <div className="w-40 h-40 bg-white shadow-lg rounded-2xl flex items-center justify-center text-xl font-bold cursor-pointer hover:scale-105 transition">
            파리
          </div>
        </Link>

          <Link href="/newyork">
          <div className="w-40 h-40 bg-white shadow-lg rounded-2xl flex items-center justify-center text-xl font-bold cursor-pointer hover:scale-105 transition">
            뉴욕
          </div>
        </Link>
      </div>
    </div>
  );
}
