import React from "react";

const TableSkeleton = () => {
  return (
    <>
      <td>
        <div className="flex flex-col gap-2 my-2 px-2">
          <div className="block md:w-40 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
            &nbsp;
          </div>
          <div className="block  md:w-20 w-10 h-3 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
            &nbsp;
          </div>
        </div>
      </td>
      <td className="md:table-cell hidden">
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td className="md:table-cell hidden">
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td className="md:table-cell hidden">
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td>
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td>
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td>
        <div className="block mx-auto md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
    </>
  );
};

export default TableSkeleton;
