import React from "react";

const DashboardTableSkeleton = () => {
  return (
    <>
      {/* order Id */}
      <td className="md:table-cell hidden animate-pulse">
        <div className="flex items-center justify-center gap-2 my-2 px-2">
          <div className="flex flex-col gap-2.5">
            <div className="w-10 md:w-36 h-4  bg-gray-200 rounded-full">
              &nbsp;
            </div>
          </div>
        </div>
      </td>
      {/* order time */}
      <td className="md:table-cell hidden animate-pulse">
        <div className="block mx-auto w-9 md:w-28 h-4  bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      {/* customer name */}
      <td className="animate-pulse">
        <div className=" md:mx-auto ml-2 w-20 md:w-28 h-4  bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      {/* method */}
      <td className="md:table-cell hidden animate-pulse">
        <div className="block mx-auto w-14 md:w-24 bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>

      {/* Amount */}
      <td className="animate-pulse">
        <div className="block mx-auto w-16 h-4 md:h-auto md:w-20 bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      {/* status */}
      <td className=" py-3 animate-pulse">
        <div className="block  py-1.5 bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      {/* action */}
      <td className="animate-pulse">
        <div className="block mx-auto w-16 md:w-24 md:py-1.5 bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      {/* view */}
      <td className="md:table-cell hidden animate-pulse">
        <div className="mx-auto  w-10 h-8  bg-slate-200 rounded-md text-inherit">
          &nbsp;
        </div>
      </td>
    </>
  );
};

export default DashboardTableSkeleton;
