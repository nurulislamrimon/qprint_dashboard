import React from 'react';

const SingleCustomerProductTableSkeleton = () => {
    return (
        <>
            <td className="py-5 px-2">
                <div className="bg-gray-200 h-4 w-10 rounded-full  mx-auto"></div>
            </td>
            <td>
                <div className="bg-gray-200 h-4 w-20 rounded-full mx-auto"></div>
            </td>
            <td>
                <div className="bg-gray-200 h-4 w-20 rounded-full mx-auto"></div>
            </td>
            <td>
                <div className="hidden md:flex items-center justify-center bg-gray-200 h-4 w-20 rounded-full mx-auto"></div>
            </td>
            <td>
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-gray-200 h-5 w-5 rounded-md "></div>
                    <div className="bg-gray-200 h-5 w-5 rounded-md "></div>
                </div>
            </td>
        </>
    );
};

export default SingleCustomerProductTableSkeleton;