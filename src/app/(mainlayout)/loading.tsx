import React from "react";
import logo from "@/assets/qlpgo.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-24 w-24 border-t-[6px] border-b-[6px] border-fuchsia-800"></div>
        <Image src={logo} alt="Loading" width={50} height={50} />
      </div>
    </div>
  );
};

export default Loading;
