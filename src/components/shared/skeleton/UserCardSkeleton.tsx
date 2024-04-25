import React from "react";

const UserCardSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse w-[calc(260px,2vw,165px)] h-[calc(220px,2vw,185px)] mt-7"
    >
      <div className="flex items-center flex-col gap-4 justify-center h-48 bg-gray-200 rounded ">
        <div className="h-16 w-16 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-28 "></div>
        <div className="h-7 bg-gray-300 rounded-md w-28"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default UserCardSkeleton;
