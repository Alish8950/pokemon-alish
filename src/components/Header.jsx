"use client";
import Image from "next/image";
import React from "react";

const Header = () => {

  return (
    <>
      <div className="h-[70px] border-b border-gray-300 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-[50px]">
            <Image
              src="/images/poke-logo.png"
              alt="CodeWalnut logo"
              width={50}
              height={50}
              className="w-full h-full"
              priority
            />
          </div>
          <div className="italic text-lg font-semibold">
            Pokemon Explorer App
          </div>
        </div>
        <div className="flex items-center gap-4">
        
        </div>
      </div>
    </>
  );
};

export default Header;
