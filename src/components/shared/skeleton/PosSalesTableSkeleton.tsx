import React from "react";

const PosSalesTableSkeleton = () => {
  return (
    <>
      <td className="md:table-cell hidden">
        <div className="block my-2 mx-auto  w-10 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-full text-inherit">
          &nbsp;
        </div>
      </td>
      <td>
        <div className="block mx-auto my-5 md:w-28 w-20 h-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-200 rounded-lg text-inherit">
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
      {/* <td className='md:table-cell hidden'>
                <div className="flex items-center ">
                    <div
                        className="block mx-auto w-6 h-6  bg-gray-200 rounded-full">

                    </div>
                    <div
                        className=" mx-auto w-6 h-6  bg-gray-200 rounded-full">

                    </div>
                </div>
            </td> */}
    </>
  );
};

export default PosSalesTableSkeleton;
