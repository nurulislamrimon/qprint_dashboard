import React from "react";

const TopSellingTableSkeleton = () => {
  return (
    <>
      <td className="w-[76%]">
        <div className="flex items-center  gap-2 my-2 px-2 animate-pulse">
          <div className="md:w-10 md:h-10 w-8 h-8  bg-gray-200 rounded-md text-inherit">
            &nbsp;
          </div>
          <div className="flex flex-col gap-4">
            <div className="md:w-32 w-20 h-2  bg-gray-200 rounded-full">
              &nbsp;
            </div>
            <div className="md:w-20 w-10 h-2  bg-gray-200 rounded-full">
              &nbsp;
            </div>
          </div>
        </div>
      </td>
      <td className="w-[12%] animate-pulse">
        <div className="flex items-center flex-col">
          <div className="flex items-center  gap-2.5">
            <div className="w-8 h-8  bg-gray-200 rounded-full text-inherit">
              &nbsp;
            </div>
            <div className=" w-10 h-2  bg-gray-200 rounded-full">&nbsp;</div>
            <div className=" text-gray-300">(0)</div>
          </div>
        </div>
      </td>
      <td className="w-[12%]">
        <div className=" text-gray-300 animate-pulse text-end">(0)</div>
      </td>
    </>
  );
};

export default TopSellingTableSkeleton;
