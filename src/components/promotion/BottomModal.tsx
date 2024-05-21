"use client";
import React, { useEffect } from "react";
import BestDeal from "./BestDeal";
import { IconX } from "@tabler/icons-react";

const BottomModal = ({ toggleBottomModal }: any) => {
  const isBrowser = () => typeof window !== "undefined"; // build time problem solved

  useEffect(() => {
    if (!isBrowser) return; // build time problem solved
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bottom-0 left-0 w-full text-black bg-black bg-opacity-75 fixed z-50 h-screen overflow-auto">
      <div className="h-[400px] md:h-[530px] fixed w-full bg-white bottom-0">
        <div className="">
          <p className="text-center text-lg text-black ">Preview</p>
          <button
            onClick={toggleBottomModal}
            className="text-black absolute top-2 right-2"
          >
            <IconX />
          </button>
        </div>
        <BestDeal />
      </div>
    </div>
  );
};

export default BottomModal;
